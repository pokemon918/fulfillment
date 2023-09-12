const TaskHeader = () => {

  return (
    <div className="flex flex-col gap-y-4 rounded-sm border border-stroke bg-white p-3 shadow-default dark:border-strokedark dark:bg-boxdark sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 className="pl-2 text-title-md font-semibold text-black dark:text-white">
          Pending Tasks
        </h3>
      </div>
    </div>
  );
};

export default TaskHeader;
