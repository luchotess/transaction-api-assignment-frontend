const DropdownUser = () => {
  return (
    <div className="relative">
      <div className="flex items-center gap-4">
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">Luis Suarez</span>
          <span className="block text-xs">Fullstack Engineer</span>
        </span>

        <span className="h-12 w-12 rounded-full overflow-hidden">
          <img
            src="https://media.licdn.com/dms/image/C4E03AQFXMkZT8gQhew/profile-displayphoto-shrink_200_200/0/1580766007494?e=1723075200&v=beta&t=cXtdTzbAklHPpvKi18Dv01OMK_pH1DELaPBlVzSiZVE"
            alt="User"
          />
        </span>
      </div>
    </div>
  );
};

export default DropdownUser;
