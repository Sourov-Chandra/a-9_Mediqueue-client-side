import Link from "next/link";
import Image from "next/image";
import { BsStarFill, BsGlobe, BsBook, BsArrowRight } from "react-icons/bs";

export default function TutorCard({ tutor }) {
  return (
    <div className="group relative rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/60 dark:border-gray-800/60 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden">
   
      <div className="relative h-48 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
        <Image
          src={tutor.image}
          alt={`${tutor.name} profile`}
          fill
          className=" object-contain transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-black/30 backdrop-blur-md px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
          <BsStarFill size={11} className="text-amber-400" /> {tutor.review}
        </div>
      </div>

      <div className="p-5 flex flex-col gap-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
            {tutor.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mt-1.5 leading-relaxed">
            {tutor.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 dark:bg-sky-900/30 px-3 py-1.5 text-xs font-medium text-sky-600 dark:text-sky-300 border border-sky-100 dark:border-sky-800/50">
            <BsBook size={12} /> {tutor.subject}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 dark:bg-gray-800 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700/50">
            <BsGlobe size={12} /> {tutor.language}
          </span>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">
              Starting at
            </span>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              ${tutor.hourlyRate}
              <span className="text-sm font-normal text-gray-400">/hr</span>
            </span>
          </div>

          <Link
            href={`/tutors/${tutor._id}`}
            className="group/btn inline-flex items-center gap-2 rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-sky-500/20 hover:bg-sky-700 hover:shadow-lg hover:shadow-sky-500/30 hover:-translate-x-0.5 active:translate-x-0 transition-all duration-200"
          >
            View Details
            <BsArrowRight
              size={14}
              className="transition-transform group-hover/btn:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
