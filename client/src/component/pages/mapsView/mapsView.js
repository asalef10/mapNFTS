import { useEffect, useState } from "react";
import useMaps from "../../../hook/useMaps";
import { MapContainer, TileLayer, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useWeb3React } from "@web3-react/core";
import Badge from "../../fetchers/badge";
import { useHistory } from "react-router-dom";
import Spinner from "../../fetchers/spinner";

const center = [40.63463151377654, -97.89969605983609];
const MapsView = ({ addressWallet, isCanBuy, setIsCanBuy }) => {
  const history = useHistory();
  const { account } = useWeb3React();

  const [listMaps, setListMaps] = useState([]);
  const [messageError, setMessageError] = useState("");
  const [isBuy, setIsBuy] = useState(0);
  const [displaySpinner, setDisplaySpinner] = useState(false);
  const { buyLocations, releaseLocation } = useMaps();
  useEffect(() => {
    let mounted = true;
    getDataFromDB();
    return () => (mounted = false);
  }, [listMaps[0]?.id, addressWallet, isBuy]);

  class LocationsArray {
    constructor(id, name, type, addressRenter, arrayCoordinates) {
      this.id = id;
      this.name = name;
      this.type = type;
      this.addressRenter = addressRenter;
      this.arrayCoordinates = arrayCoordinates;
    }
  }

  let arr = [];
  let results = [];
  const filterArray = async (array) => {
    let objLocation = [];
    for (let i = 0; i < 55; i++) {
      objLocation.push(
        array.filter(function (e) {
          return e.locationId === i;
        })
      );
    }

    for (let j = 0; j < objLocation.length; j++) {
      convertArray(objLocation[j]);
    }
    return results;
  };

  const convertArray = async (array) => {
    let newLocation;
    let lon;
    let lat;

    let arrayCoordinates = [];

    for (let i = 0; i < array.length; i++) {
      lat = array[i].lat;
      lon = array[i].lon;
      arrayCoordinates.push([lat, lon]);
      newLocation = new LocationsArray(
        array[i]?.locationId,
        array[i]?.name,
        array[i]?.type,
        array[i]?.addressRenter,
        arrayCoordinates
      );
    }
    arr.push(newLocation);

    results = arr.filter((element) => {
      return element !== undefined;
    });
    return results;
    // console.log(results);
  };

  const clearMessageError = async () => {
    setTimeout(() => {
      setMessageError("");
    }, 3000);
  };
  const getDataFromDB = async () => {
    await fetch("http://localhost:8080/getData")
      .then((response) => response.json())
      .then((data) => {
        filterArray(data).then((result) => {
          setListMaps(result);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const upDateDetailsInDataBase = async (idUp, accountUser, type) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "content-length": "355",
        "content-type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        id: idUp,
        addressRenter: `'${accountUser}'`,
        type: type,
      }),
    };

    fetch("http://localhost:8080/upDateData", requestOptions)
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const buyLocation = async (location) => {
    if (account) {
      if (!location.type) {
        if (isCanBuy) {
          setDisplaySpinner(true);
          buyLocations(location.id)
            .then(() => {
              console.log("displaySpinner");
              upDateDetailsInDataBase(location.id, account, true)
                .then(() => {
                  setIsBuy((x) => x + 1);
                  setIsCanBuy(false);
                })
                .catch((error) => {
                  releaseLocation(location.id);
                  console.log(error);
                });
            })
            .finally(() => {
              setDisplaySpinner(false);
            });
        } else {
          setMessageError(
            "For a place on the map, you have to break the highest record in the Snake game !!"
          );
          clearMessageError();
        }
      } else {
        if (isCanBuy) {
          if (location.addressRenter === account) {
            setDisplaySpinner(true);

            releaseLocation(location.id)
              .then(() => {
                setDisplaySpinner(true);
                upDateDetailsInDataBase(location.id, null, false).then((x) => {
                  setIsBuy((x) => x + 1);
                  console.log(x);
                });
              })
              .finally(() => {
                setDisplaySpinner(false);
              });
          } else {
            setMessageError("This location Catch !!");
            clearMessageError();
          }
        } else {
          setMessageError(
            "For a place on the map, you have to break the highest record in the Snake game !!"
          );
          clearMessageError();
        }
      }
    } else {
      setMessageError("Connect metamask !!");
      clearMessageError();
    }
  };
  let numKey = 0;
  return (
    <>
      <button
        style={{
          backgroundColor: "red",
          color: "white",
          borderStyle: "inset",
          float: "right",
          width: "12%",
          fontSize: "large",
          marginTop: "-2%",
        }}
        onClick={() => {
          history.push("/game");
        }}
      >
        Go to game
      </button>
      <Badge message={messageError} />
      &nbsp;
      {displaySpinner && <Spinner />}
      <MapContainer
        center={center}
        zoom={5}
        style={{ width: "100vw", height: "100vh" }}
      >
        <TileLayer
          url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=9WFebKyo4SzKO0H6sXG3"
          attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
        />
        {listMaps?.map((res) => {
          numKey += 1;
          const coordinates = res.arrayCoordinates.map((item) => [
            item[1],
            item[0],
          ]);
          return (
            <Polygon
              pathOptions={{
                fillColor:
                  res.addressRenter === account
                    ? "blue"
                    : res.type === 1
                    ? "red"
                    : "#FD8D3C",
                fillOpacity: 0.7,
                weight: 2,
                opacity: 1,
                dashArray: 3,
                color: "white",
              }}
              key={numKey}
              positions={[coordinates]}
              eventHandlers={{
                mouseover: (e) => {
                  const layer = e.target;
                  layer.setStyle({
                    dashArray: "",
                    fillColor: "green",
                    fillOpacity: 0.7,
                    weight: 2,
                    opacity: 1,
                    color: "white",
                  });
                },
                mouseout: (e) => {
                  const layer = e.target;
                  layer.setStyle({
                    fillOpacity: 0.7,
                    weight: 2,
                    dashArray: "3",
                    color: "white",
                    fillColor:
                      res.addressRenter === account
                        ? "blue"
                        : res.type === 1
                        ? "red"
                        : "#FD8D3C",
                  });
                },
                click: (e) => {
                  console.log(res);
                  buyLocation(res);
                },
              }}
            />
          );
        })}
      </MapContainer>
    </>
  );
};
export default MapsView;
