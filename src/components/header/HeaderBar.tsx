import NavBar from "./NavBar";
import FilterBar from "./SearchBar";
import UserInfo from "./UserInfo";

export default function HeaderBar() {
  return (
    <div className="grid items-center grid-cols-3 gap-8 col-span-3 h-12 fixed top-0 left-4 md:left-[235px] right-8 lg:right-4 z-[99] pt-12 ">
      <NavBar />
      <FilterBar />
      <div className="hidden lg:block">
        <UserInfo />
      </div>
    </div>
  );
}
