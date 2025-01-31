import React, { useState } from "react";
import { useAccountsCtx } from "../../store/AccountContext";
import Button from "../../components/UI/Button";
import moreIcon from "../../assets/img/vertical_dots.svg";
import { AnimatePresence, motion } from "framer-motion";

const AccountCard: React.FC = () => {
  const { userAccounts } = useAccountsCtx();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const account = userAccounts && userAccounts.length > 0 ? userAccounts[0] : null;

  if (!account) {
    return (
      <div className="w-full p-5 border rounded-xl flex justify-center items-center">
        <span>Loading account data...</span>
      </div>
    );
  }

  return (
    <section className="w-full p-5 border rounded-xl flex flex-col justify-center items-center gap-5">
      <header className="w-full flex justify-between items-start">
        <h2>Account: <span className="font-[600]">{account.name}</span></h2>
        <div className="relative w-auto">
          <AnimatePresence>
            {menuOpen && (
              <motion.ul
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="w-auto flex-col text-center rounded-xl bg-white border absolute right-[100%] overflow-hidden top-0 z-10 shadow-lg"
              >
                <li className="px-5 py-2 hover:bg-gray-100 cursor-pointer">Edit</li>
                {account.main && <li className="px-5 py-2 hover:bg-gray-100 cursor-pointer text-nowrap">Set to main</li>}
                <li className="px-5 py-2 hover:bg-gray-100 cursor-pointer text-red-600">Delete</li>
              </motion.ul>
            )}
          </AnimatePresence>
          <Button variant={1} disableAnimations={true} onClick={() => setMenuOpen(p => !p)}>
            <img src={moreIcon} className="w-[5px] h-auto " />
          </Button>
        </div>
      </header>
      <div>
        <span className="font-[800] text-5xl">{account.balance}</span>
        <span className="font-[300] text-2xl ml-1">{account.currencyCode}</span>
      </div>
    </section>
  );
};

export default AccountCard;
