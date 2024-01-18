export const ServiceSlide: React.FC<IService> = ({ ...props }) => {
  return (
    <a href={`/services/${props.id}`} className="max-w-[250px]">
      <div className="w-full h-[250px] border  border-slate-100">
        <img
          className="object-contain rounded-md shadow-md w-full h-full"
          src={props.thumbnail}
        />
      </div>
      <h3 className="text-[18px] font-semibold mt-2 font-Poppins">
          {props.title.substring(0,50)+"..."}
      </h3>
    </a>
  );
};

export const Service: React.FC<IService> = ({ ...props }) => {
  return (
    <a
      href={`/services/${props.id}`}
      className="w-full md:max-w-[250px] flex items-center md:flex-col md:items-start space-x-1 md:space-x-0 "
    >
      <div className="w-full h-[250px] border  border-slate-100 rounded-md">
        <img
          className="object-contain rounded-md shadow-md w-full h-full"
          src={props.thumbnail}
        />
      </div>
      <h3 className="text-sm md:text-[18px] font-semibold md:mt-2 font-Poppins">
        {props.title.substring(0,50)+"..."}
      </h3>
    </a>
  );
};
