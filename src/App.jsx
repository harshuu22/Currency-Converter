import { useState } from "react";
import useCurrencyinfo from "./hooks/useCurrencyInfo";
import InputBox from "./components/InputBox";
import "./App.css";

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  // getting fetched data from "import useCurrencyinfo from "./hooks/useCurrencyInfo";"
  const currencyInfo = useCurrencyinfo(from);
  const options = Object.keys(currencyInfo);

  // converting amount
  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  };

  // swaping the currency
  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  return (
    <div
      className="w-full h-screen flex justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(https://static.vecteezy.com/system/resources/previews/040/959/652/non_2x/currency-exchange-concept-with-graph-chart-and-dollar-coin-forex-trading-financial-markets-and-global-economy-design-background-illustration-vector.jpg)`,
      }}
    >
      <div className="w-80 sm:w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-black/40">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}
        >
          <div className="w-full mb-1">
            {/* input box import from import InputBox from
            "./components/InputBox"; */}
            <InputBox
              label="from"
              amount={amount}
              currencyOptions={options}
              onAmountChange={(amount) => setAmount(amount)}
              onCurrencyChange={(currency) => setFrom(currency)}
              selectedCurrency={from}
            />
          </div>
          <div className="relative w-full h-0.5">
            {/* //button for swapping currency */}
            <button
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
              onClick={swap}
            >
              Swap
            </button>
          </div>
          <div className="w-full mb-1">
            {/* //input box import from import InputBox from
            "./components/InputBox"; */}
            <InputBox
              label="to"
              amount={convertedAmount}
              currencyOptions={options}
              amountDisabled={true}
              onCurrencyChange={(currency) => setTo(currency)}
              selectedCurrency={to}
              onAmountChange={(amount) => setAmount(amount)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
          >
            Convert {from.toUpperCase()} to {to.toUpperCase()}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
