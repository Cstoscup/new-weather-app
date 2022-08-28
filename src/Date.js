import React, {useState, useEffect} from "react";
import axios from "axios";

export default function Date(props) {
    const [day, setDay] = useState("");
    const [time, setTime] = useState("");
    const [ready, setReady] = useState(false);
    
    useEffect(() => {
        setReady(false)
    }, [props]);

    function getDate() {
        setReady(true);
        let long = props.response.lon;
        let lat = props.response.lat;
        let apiKey = "6aa24761b999470a92c6399feefd0f88";
        let url = `https://api.ipgeolocation.io/timezone?apiKey=${apiKey}&lat=${lat}&long=${long}`;
        axios.get(url).then(displayDate);
    }

    function displayDate(response) {
        let timeLong = response.data.time_12;
        let timeArray = timeLong.split("")
        timeArray.splice(5, 3);
        if (timeArray[0] === "0") {
            timeArray.shift();
        }

        setTime(timeArray.join(""))
        let date = response.data.date_time_txt;
        let dayComma = date.split(" ")[0];
        setDay(dayComma.slice(0, -1));
    }
    
    if (ready) {
        return <h5 className="date-time mt-2">{day} {time}</h5>;
    } else {
        getDate();
    }
}