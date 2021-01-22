import Link from 'next/link';

const LangSwitch = () => {
  return (
    <div className="lang-switch">
      <div className="lang-container">
        <div>
          <Link href="/en">EN</Link>
        </div>
        <div>
          <Link href="/de">DE</Link>
        </div>
      </div>
    </div>
  );
};

export default LangSwitch;
