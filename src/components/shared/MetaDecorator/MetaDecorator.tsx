import { Helmet } from "react-helmet";

type Props = {
  title: string;
};
const MetaDecorator = ({ title }: Props) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>Dashboard - {title}</title>
      {/* <link rel="canonical" href="http://mysite.com/example" /> */}
    </Helmet>
  );
};

export default MetaDecorator;
