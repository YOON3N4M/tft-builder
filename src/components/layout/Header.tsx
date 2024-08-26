import Link from "next/link";
import SummonerSearchForm from "../SummonerSearchForm";

interface HeaderProps {}

function Header(props: HeaderProps) {
  const {} = props;

  return (
    <header>
      <div className="inner py-sm semi-bold text-main-text text-nowrap flex items-center">
        <Link className="" href={"/"}>
          <h1>TFT BUILDER</h1>
        </Link>
        <div className="ml-auto">
          <SummonerSearchForm />
        </div>
      </div>
    </header>
  );
}

export default Header;
