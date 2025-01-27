import React, { useState } from "react";
import { useAuth } from "../../store/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/UI/Button";
import { useAccountsCtx } from "../../store/AccountContext";

const Onboarding: React.FC = () => {
  const { user } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const {addUserAccount} = useAccountsCtx();
  const navigate = useNavigate();

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
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string | null;
    const type = formData.get("type") as string | null;
    const balance = formData.get("balance") as string | null;
    const currencyCode = formData.get("currencyCode") as string | null;

    if (!name || !type || !balance || !currencyCode) {
      setErrorMessage("Name, type, balance and currency code are required.");
      return;
    }
    const data = { name, type, balance, currencyCode };

    const result = await addUserAccount(data);
    if(result.status == "Success") {
        navigate("/dashboard");
    }    
    setErrorMessage(result.text)
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
          <Button type="submit" className="self-end">
            Save
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Onboarding;
