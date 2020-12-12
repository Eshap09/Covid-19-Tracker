import {MenuItem,Select, FormControl,Card, CardContent } from '@material-ui/core';
import React,{useEffect, useState} from 'react';
import InfoBox from './InfoBox';
import  Map from './Map';
import "./App.css";
import Table from './Table';
import {sortData,prettyPrintStat} from './util';
import LineGraph from './LineGraph';
import "leaflet/dist/leaflet.css";

function App() {
  //state using useState
  const [countries,setCountries]=useState([]);
  const [country,setCountry]=useState("worldwide");
  const [countryInfo,setCountryInfo]=useState({});
  const [tableData,setTableData]=useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries,setMapCountries]=useState([]);
  const [casesType, setCasesType] = useState("cases");
  //useEffect = runs a piece of code based on a given condition
  useEffect(()=>{
        fetch("https://disease.sh/v3/covid-19/all")
        .then(response=>response.json())
        .then(data=>{
            setCountryInfo(data);
        });
  },[]);
//this is done as to initialize the data in tracker of worldwide cases n all
//When the app will load for very first time it will get executed



  useEffect(()=> {
   //the code inside here will run once when the component loads and not again
    // means when the country changes i.e fire of the code
//async->sends a request,wait for it do something with it
    const getCountriesData = async()=> {
      await fetch("https://disease.sh/v3/covid-19/countries")
      //when it comes back and getting the response
      //data is what we naming that we got from source
      .then((response)=>response.json())
      .then((data)=>{
        const countries = data.map((country)=> ({
            name:country.country,//india,united kingdom
            value: country.countryInfo.iso2//ind,uk
          }));
          const sorteddata=sortData(data);
          setTableData(sorteddata);
          setMapCountries(data);
          setCountries(countries);
      });
    }; 
    getCountriesData();
    //for calling the function
    //for async useeffect
  },[]);
//as in this bracket nothing is written so when react.js gets loaded then this will useEffect will get execute
  const onCountryChange=async (event)=> {
    const countrycode=event.target.value;
    setCountry(countrycode);

    const url =countrycode ==="worldwide" ? "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${countrycode}` 
    //https://disease.sh/v3/covid-19/all gives info about worldwide
    //https://disease.sh/v3/covid-19/countries/[COUNTRY_CODE]
    //will give info about country
     await fetch(url)
    .then(response=> response.json())
    .then(data=> {
      setCountry(countrycode);
      //All of the data...
      //from the country response
      //it stores all the info of the countryinfo
      //so when we change the dropdown it gets info about everything of the country
      setCountryInfo(data);
      setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
      setMapZoom(4);
    });
  };
//fabulous
  //it gets all the data inside the api of disease and stores it in state i.e setcountries
//fetch  is used to get data frm the api
//using then

//console.log("hjshj c0,",countryInfo);
  return (
    <div className="app">
       <div className="app__left">
          <div className="app__header">
          <h1><i>Covid-19 Tracker</i></h1>
          <FormControl className="app__dropdown">
          <Select variant="outlined" onChange={onCountryChange} value={country}// setting up initial on dropdown button
            >
              
              {/* loop through all the countries and 
              will be doing through state
              show a drop down list options */}
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {
                countries.map((country)=> (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))
              }
              
              {/*use effect se store kiya countries me and then mapped it */}
              {/*<MenuItem value="worldwide">y</MenuItem>
              <MenuItem value="worldwide">W</MenuItem>
              <MenuItem value="worldwide">wide</MenuItem>
              <MenuItem value="worldwide">Worldwide</MenuItem>
              */}
          </Select>
        </FormControl>
      </div>
    
     
    {/*header*/}
    {/*Title + Select input dropdown field*/}
    {/*upar hai header*/}

    {/* now infoboxes*/}
    <div className="app__stats">
        <InfoBox
        isRed 
        active={casesType === "cases"}
        onClick={(e) => setCasesType("cases")}
        title="Corona Cases" cases={prettyPrintStat(countryInfo.todayCases)} total={prettyPrintStat(countryInfo.cases)} />
      {/*INFOBOXS title="corona virus cases*    todaycases cases these r the keys*/}
        <InfoBox
        active={casesType === "recovered"}
        onClick={(e) => setCasesType("recovered")}
        title="Recoverd" cases={prettyPrintStat(countryInfo.todayRecovered)} total={prettyPrintStat(countryInfo.recovered)}/>
      
      {/*INFOBOXS title="coronavirus recoveries*/}
      <InfoBox
      isRed 
      active={casesType === "deaths"}
      onClick={(e) => setCasesType("deaths")}
      title="Deaths" cases={prettyPrintStat(countryInfo.todayDeaths)} total={prettyPrintStat(countryInfo.deaths)}/>
      {/*INFOBOXS*/}
    </div>

    {/* Map */}
    <Map 
     casesType={casesType}
     countries={mapCountries}
     center={mapCenter}
     zoom={mapZoom}
     />
    </div>
        
        <Card className="app__right">
             {/* instaed of div tag we r using card 
             table and graph */} 
            <CardContent>
              {/*table*/}
              <h3>Live cases by country</h3>
              <Table countries={tableData}/>
              <h3 className="app__graphTitle">Worldwide new {casesType}</h3>
              <LineGraph className="app__graph" casesType={casesType}/>
              {/*graph*/}

              
            </CardContent>
       </Card>
 </div>    
  );
}

export default App;
