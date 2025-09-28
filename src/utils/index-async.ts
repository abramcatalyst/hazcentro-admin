import axios from "axios";
import { formatErrorMessage, setDefaultHeaders } from ".";
import toast from "react-hot-toast";

export const handleDownloadCSVFile = async ({
  urlPath,
  fileName,
}: {
  urlPath: string;
  fileName: string;
}) => {
  setDefaultHeaders();

  try {
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/${urlPath}`, {
      responseType: "blob",
      headers: { Accept: "text/csv" },
    });

    const filename = `${fileName}.csv`;

    const blob = new Blob([res.data], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
    // free memory
    URL.revokeObjectURL(link.href);
  } catch (error) {
    const errorMsg = formatErrorMessage(error);
    toast.error(errorMsg);
  }
};

function getFilenameFromContentDisposition(cd?: string | null): string | null {
  if (!cd) return null;
  // try filename*=UTF-8''... first
  const fnStarMatch = cd.match(
    /filename\*\s*=\s*(?:[Uu][Tt][Ff]-?8'')?([^;]+)/
  );
  if (fnStarMatch && fnStarMatch[1]) {
    try {
      // decode RFC5987 percent-encoding
      const raw = fnStarMatch[1].trim().replace(/^["']|["']$/g, "");
      return decodeURIComponent(raw);
    } catch {}
  }
  // fallback to filename="..."
  const fnMatch = cd.match(/filename\s*=\s*["']?([^;"']+)["']?/);
  if (fnMatch && fnMatch[1]) {
    return fnMatch[1].trim();
  }
  return null;
}

export async function handleDownloadPDFFile({
  url,
  fileName,
  openInNewTabIfBlocked,
}: {
  url: string;
  fileName: string;
  openInNewTabIfBlocked?: boolean;
}) {
  const controller = new AbortController();

  try {
    const res = await fetch(url, {
      signal: controller.signal,
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Download failed: ${res.status} ${res.statusText}`);
    }

    const contentType = res.headers.get("content-type") || "application/pdf";
    const contentDisposition = res.headers.get("content-disposition");
    // prefer filename from header, then prop, then url basename
    const nameFromHeader =
      getFilenameFromContentDisposition(contentDisposition);
    const finalName = fileName;
    nameFromHeader ||
      decodeURIComponent(
        new URL(url).pathname.split("/").pop() || "download.pdf"
      );

    if (res.body && typeof ReadableStream !== "undefined") {
      // Stream and accumulate chunks

      const chunks: BlobPart[] = [];

      // combine chunks into blob
      const blob = new Blob(chunks, { type: contentType });
      const objectUrl = URL.createObjectURL(blob);

      // create temp anchor to trigger download
      const a = document.createElement("a");
      a.href = objectUrl;
      a.download = finalName;
      // For Safari, opening in same tab requires setting target to "_self" and dispatching click
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } else {
      // fallback if streaming not available
      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = objectUrl;
      a.download = finalName;
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      a.remove();
    }
  } catch (err: any) {
    // handle abort specially
    console.log(err);
    if (err?.name === "AbortError") {
    } else {
      if (openInNewTabIfBlocked) {
        try {
          window.open(url, "_blank", "noopener");
        } catch {}
      }
    }
  } finally {
  }
}

export async function handleDownloadJPGFile({
  url,
  fileName,
  signal,
}: {
  url: string;
  fileName?: string;
  signal?: AbortSignal;
}): Promise<void> {
  // Helper: parse filename from Content-Disposition (RFC5987 + fallback)
  function filenameFromContentDisposition(cd: string | null): string | null {
    if (!cd) return null;
    // filename* (RFC 5987) e.g. filename*=UTF-8''%e2%82%ac%20rates.pdf
    const fnStarMatch = cd.match(
      /filename\*\s*=\s*(?:[Uu][Tt][Ff]-?8'')?([^;]+)/
    );
    if (fnStarMatch && fnStarMatch[1]) {
      try {
        const raw = fnStarMatch[1].trim().replace(/^['"]|['"]$/g, "");
        return decodeURIComponent(raw);
      } catch {
        // fall through
      }
    }
    // filename="name.pdf"
    const fnMatch = cd.match(/filename\s*=\s*["']?([^;"']+)["']?/);
    if (fnMatch && fnMatch[1]) {
      return fnMatch[1].trim();
    }
    return null;
  }

  // Helper: basename from URL
  function basenameFromUrl(u: string): string {
    try {
      const p = new URL(u).pathname;
      const last = p.split("/").filter(Boolean).pop();
      return last ? decodeURIComponent(last) : "download.jpg";
    } catch {
      return "download.pdf";
    }
  }

  const controller = signal ? undefined : new AbortController();
  const fetchSignal = signal ?? controller?.signal;

  const res = await fetch(url, { method: "GET", signal: fetchSignal });

  if (!res.ok) {
    throw new Error(`Failed to download: ${res.status} ${res.statusText}`);
  }

  const contentType = res.headers.get("content-type") || "application/pdf";
  if (!contentType.includes("pdf")) {
    // optional: warn if not PDF
    // throw new Error(`Expected a PDF but got content-type: ${contentType}`);
  }

  const cdHeader = res.headers.get("content-disposition");
  const nameFromHeader = filenameFromContentDisposition(cdHeader);
  const filename = nameFromHeader ?? fileName ?? basenameFromUrl(url);

  // Read response as blob
  const blob = await res.blob();

  // Create object URL and trigger download
  const objectUrl = URL.createObjectURL(blob);

  // Create an anchor and trigger a click
  const a = document.createElement("a");
  a.href = objectUrl;
  a.download = filename;
  // For some browsers (Safari) anchor must be added to DOM
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  a.remove();

  // Revoke after a short delay to ensure download started
  setTimeout(() => {
    URL.revokeObjectURL(objectUrl);
  }, 1000);
}

export async function downloadPdf({
  url,
  fileName,
  signal,
}: {
  url: string;
  fileName?: string;
  signal?: AbortSignal;
}): Promise<void> {
  // Helper: parse filename from Content-Disposition (RFC5987 + fallback)
  function filenameFromContentDisposition(cd: string | null): string | null {
    if (!cd) return null;
    // filename* (RFC 5987) e.g. filename*=UTF-8''%e2%82%ac%20rates.pdf
    const fnStarMatch = cd.match(
      /filename\*\s*=\s*(?:[Uu][Tt][Ff]-?8'')?([^;]+)/
    );
    if (fnStarMatch && fnStarMatch[1]) {
      try {
        const raw = fnStarMatch[1].trim().replace(/^['"]|['"]$/g, "");
        return decodeURIComponent(raw);
      } catch {
        // fall through
      }
    }
    // filename="name.pdf"
    const fnMatch = cd.match(/filename\s*=\s*["']?([^;"']+)["']?/);
    if (fnMatch && fnMatch[1]) {
      return fnMatch[1].trim();
    }
    return null;
  }

  // Helper: basename from URL
  function basenameFromUrl(u: string): string {
    try {
      const p = new URL(u).pathname;
      const last = p.split("/").filter(Boolean).pop();
      return last ? decodeURIComponent(last) : "download.pdf";
    } catch {
      return "download.pdf";
    }
  }

  const controller = signal ? undefined : new AbortController();
  const fetchSignal = signal ?? controller?.signal;

  const res = await fetch(url, { method: "GET", signal: fetchSignal });

  if (!res.ok) {
    throw new Error(`Failed to download: ${res.status} ${res.statusText}`);
  }

  const contentType = res.headers.get("content-type") || "application/pdf";
  if (!contentType.includes("pdf")) {
    // optional: warn if not PDF
    // throw new Error(`Expected a PDF but got content-type: ${contentType}`);
  }

  const cdHeader = res.headers.get("content-disposition");
  const nameFromHeader = filenameFromContentDisposition(cdHeader);
  const filename = nameFromHeader ?? fileName ?? basenameFromUrl(url);

  // Read response as blob
  const blob = await res.blob();

  // Create object URL and trigger download
  const objectUrl = URL.createObjectURL(blob);

  // Create an anchor and trigger a click
  const a = document.createElement("a");
  a.href = objectUrl;
  a.download = filename;
  // For some browsers (Safari) anchor must be added to DOM
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  a.remove();

  // Revoke after a short delay to ensure download started
  setTimeout(() => {
    URL.revokeObjectURL(objectUrl);
  }, 1000);
}
