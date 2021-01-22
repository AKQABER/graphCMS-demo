import Head from 'next/head';
import Link from 'next/link';

const Index = props => {
  return (
    <div className="container">
      <Head>
        <title>Index</title>
      </Head>
      <div className="index-container">
        <div>
          <h3>Locale:</h3>

          <div className="links-container">
            <div className="link">
              <Link href="/en">English</Link>
            </div>
            <div className="link">
              <Link href="/de">Deutsch</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
