import React, { useState, useEffect } from "react";
import { useAuth } from "../../store/AuthContext";
import { Link, useNavigate, Navigate } from "react-router-dom";
import Button from "../../components/UI/Button";
import { useAccountsCtx } from "../../store/AccountContext";
import Spinner from "../../components/UI/Spinner";
import homeIcon from "../../assets/img/House Chimney Icon.svg";
import carIcon from "../../assets/img/Car Icon.svg";
import travelIcon from "../../assets/img/Earth Americas Icon.svg";
import groceriesIcon from "../../assets/img/Shopping Cart Icon.svg";
import sportIcon from "../../assets/img/Skiing Icon.svg";
import clothingIcon from "../../assets/img/Solid Shirt Icon.svg";
import { motion } from "framer-motion";

const categories: { name: string; icon: string }[] = [
  {
    name: "Home",
    icon: homeIcon,
  },
  {
    name: "Car",
    icon: carIcon,
  },
  {
    name: "Travels",
    icon: travelIcon,
  },
  {
    name: "Groceries",
    icon: groceriesIcon,
  },
  {
    name: "Sports",
    icon: sportIcon,
  },
  {
    name: "Clothing",
    icon: clothingIcon,
  },
];

const Onboarding: React.FC = () => {
  const { user } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [choosenCategories, setChoosenCategories] = useState<number[]>([]);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const { addUserAccount, addUserCategories, getUserAccounts } = useAccountsCtx();
  const [checkingAccount, setCheckingAccount] = useState(true);
  const [hasAccount, setHasAccount] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkIfUserHaveAccount = async () => {
      if (user) {
        try {
          const response = await getUserAccounts();
          setHasAccount(response.status === "Success");
        } catch (err) {
          console.error(err);
          setHasAccount(false);
        } finally {
          setCheckingAccount(false);
        }
      } else {
        setCheckingAccount(false);
      }
    };

    checkIfUserHaveAccount();
  }, []);

  if (checkingAccount) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (hasAccount === true) {
    return <Navigate to="/dashboard" replace />;
  }

  const popularCurrencyCodes = [
    "PLN",
    "USD", // United States Dollar
    "EUR", // Euro
    "JPY", // Japanese Yen
    "GBP", // British Pound Sterling
    "AUD", // Australian Dollar
    "CAD", // Canadian Dollar
    "CHF", // Swiss Franc
    "CNY", // Chinese Yuan Renminbi
    "SEK", // Swedish Krona
    "NZD", // New Zealand Dollar
  ];

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    setButtonDisabled(true);
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string | null;
    const type = formData.get("type") as string | null;
    const balance = formData.get("balance") as string | null;
    const currencyCode = formData.get("currencyCode") as string | null;

    if (!name || !type || !balance || !currencyCode) {
      setErrorMessage("Name, type, balance and currency code are required.");
      return;
    }
    const categoriesToAdd: string[] = categories.filter((_, index) =>
      choosenCategories.includes(index)
    ).map((item) => item.name);
    const data = { name, type, balance, currencyCode };
    const result = await addUserAccount(data);
    if (result.status == "Success") {
      const catResult = await addUserCategories([...categoriesToAdd, "General"]);
      if (catResult.status == "Success") {
        return navigate("/dashboard");
      }
    }
    setErrorMessage(result.text);
    setButtonDisabled(true);
  };

  const handleToggleCategory = (index: number) => {
    setChoosenCategories((prev) =>
      prev.includes(index) ? prev.filter(item => item !== index) : [...prev, index]
    );
  };
  

  return (
    <section className="w-full min-h-screen flex flex-col justify-center items-center p-5 sm:p-5">
      <div className=" flex flex-col gap-5  justify-center items-stretch max-w-screen-sm">
        <Link
          to={"/login"}
          className="self-start text-sm text-gray-300 hover:text-gray-800 transition-all duration-200 sm:hover:translate-x-[-15px]  text-[300] sm:translate-x-[-20px]"
        >
          &larr; log out
        </Link>
        <header className="border-b pb-2">
          <h1 className="text-2xl">
            <strong>Hello!</strong> We are happy to see you {user?.name}!
          </h1>
        </header>
        <p className=" text-justify text-sm sm:text-base ">
          You're just one step away from getting started. To unlock the full
          potential of PerFounds, we need to set up your first account. Here’s
          how it works: Give your account a name, select a type (e.g., savings,
          checking, etc.), and most importantly, enter your current balance.
          This will be the foundation for tracking your expenses, savings, and
          financial progress. Let’s make this the starting point of your
          financial journey!
        </p>
        <form
          className="flex flex-col justify-center gap-2"
          onSubmit={handleSubmit}
        >
          <div className=" flex flex-row gap-2  items-center">
            <input
              type="text"
              id="nameInput"
              name="name"
              placeholder="Name"
              disabled={buttonDisabled}
              required
              // className="bg-lightest-blue dark:bg-darkest-blue border border-lightest-blue dark:border-black-blue hover:border-dark-blue dark:hover:border-slate-200 transition-all duration-200 rounded-md p-3 text-black dark:text-white text-sm "
              className="bg-gray-50 border  border-gray-300 hover:border-gray-500 w-1/2 transition-all duration-200 rounded-md p-3 text-black text-sm sm:text-base "
            />
            <input
              type="text"
              id="typeInput"
              name="type"
              placeholder="Type (e.g. checking)"
              required
              disabled={buttonDisabled}
              // className="bg-lightest-blue dark:bg-darkest-blue border border-lightest-blue dark:border-black-blue hover:border-dark-blue dark:hover:border-slate-200 transition-all duration-200 rounded-md p-3 text-black dark:text-white text-sm "
              className="bg-gray-50 border w-1/2  border-gray-300 hover:border-gray-500 transition-all duration-200 rounded-md p-3 text-black text-sm sm:text-base "
            />
          </div>

          <div className="w-full flex gap-2 justify-between items-center">
            <input
              type="number"
              id="balanceInput"
              name="balance"
              placeholder="Current balance"
              min={0}
              required
              disabled={buttonDisabled}
              // className="bg-lightest-blue dark:bg-darkest-blue border border-lightest-blue dark:border-black-blue hover:border-dark-blue dark:hover:border-slate-200 transition-all duration-200 rounded-md p-3 text-black dark:text-white text-sm "
              className="bg-gray-50 border flex-1 border-gray-300 hover:border-gray-500 transition-all duration-200 rounded-md p-3 text-black text-sm sm:text-base "
            />
            <select
              id="currency"
              name="currencyCode"
              className="bg-gray-50 border flex-0 border-gray-300 hover:border-gray-500 transition-all duration-200 rounded-md p-3 text-black text-sm sm:text-base "
            >
              {popularCurrencyCodes.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <p className="text-sm text-red-600">{errorMessage}</p>
          <p className="border-t py-5 text-justify text-sm sm:text-base ">
            You can also choose what type of expenses categories you want to
            add. Remember that you can always just set it later. If you don't
            choose, we will just add one category "expenses" by default.
          </p>
          <div className=" gap-2 grid grid-cols-3">
            {categories.map((category, index) => {
              return (
                <motion.li
                initial={{scale: 1, border: "1px solid #aaa"}}
                whileHover={{scale: 1.05, zIndex:  100}}
                animate={{
                  borderColor: choosenCategories.includes(index) ? "111" : "#aaa",
                  backgroundColor: choosenCategories.includes(index) ? "#CCEEFF" : "#fff",
                }}
                onClick={() => handleToggleCategory(index)}
                  key={category.name}
                  className={` w-full p-5 flex flex-col gap-5 bg-white  rounded-md justify-center items-center`}
                >
                  <motion.img
                  initial={{opacity: 0.5}}
                  whileHover={{opacity: 1, zIndex:  100}}
                  animate={choosenCategories.includes(index) ? {opacity: 1} : {opacity: 0.5}}
                    src={category.icon}
                    className={`h-12  w-auto`}
                  />
                  <p className="font-[600] text-base">{category.name}</p>
                </motion.li>
              );
            })}
          </div>

          <Button disabled={buttonDisabled} type="submit" className="self-end">
            Save
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Onboarding;
