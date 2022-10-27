import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import Button from "../fetchers/button";
const Layout = () => {
  const injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42, 137, 56, 43114, 80001, 421611],
  });
  const { account, activate } = useWeb3React();
  return (
    <>
      <div id="logoEarth">
        <img
          width="55%"
          src="https://media.istockphoto.com/photos/sunrise-and-shadow-on-the-earth-rotate-in-space-with-star-in-universe-picture-id1334034329?b=1&k=20&m=1334034329&s=170667a&w=0&h=4ZooekROFrUJ7gdiU2RGGrXzWb5nqdsZjvX2VW4Q7kA="
          alt=""
        />
      </div>
      {
        <div id="metaMaskButton">
          {account ? (
            <h4 style={{ color: "white" }}>{`${account?.slice(
              0,
              6
            )}...${account?.slice(-4)} `}</h4>
          ) : (
            <Button
              nameButton={"Connect MetaMask"}
              handleFunction={() => {
                activate(injected).then(() => {
                  console.log(account);
                });
              }}
            />
          )}
        </div>
      }
    </>
  );
};
export default Layout;
