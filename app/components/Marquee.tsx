import { motion } from "framer-motion";

export default function MarqueeItem({
  items,
  from,
  to,
}: {
  items: string[];
  from: number | string;
  to: number | string;
}) {
  return (
    <div className="flex">
      <motion.div
        initial={{ x: `${from}` }}
        animate={{ x: `${to}` }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="flex flex-shrink-0"
      >
        {items.map((item: any, index: number) => {
          return (
            <span
              key={index}
              className="font-medium text-base-content/30 hover:text-primary min-w-[200px] text-center object-contain pr-20"
            >
              {item}
            </span>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ x: `${from}` }}
        animate={{ x: `${to}` }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="flex flex-shrink-0"
      >
        {items.map((item: any, index: number) => {
          return (
            <span
              key={index}
              className="font-medium text-base-content/30 hover:text-primary min-w-[200px] text-center object-contain pr-20"
            >
              {item}
            </span>
          );
        })}
      </motion.div>
    </div>
  );
}
