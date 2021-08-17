import React, { useEffect, useState } from "react";
import axios from "axios";

function getSpotsRemaining(state, appointments) {
  const daysObj = state.days.find(day => day.name === state.day);
  let availableSpots = 0;
  for (const appointmentID of daysObj.appointments) {
    const appointment = appointments[appointmentID];
    if (!appointment.interview) {
      availableSpots++;
    }
  } return availableSpots;
}

export default function useApplicationData(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  })

  function bookInterview(id, interview) {
    // console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then((res) => {
        // console.log(res);
        const spotsRemaining = getSpotsRemaining(state, appointments);
        // console.log(spotsRemaining);
        const days = state.days.map(day => {
          if (day.name === state.day) {
            return { ...day, spots: spotsRemaining };
          } else {
            return day;
          }
        });

        // save to state and overwrite new appointments (save button)
        setState({
          ...state,
          appointments,
          days
        });
      })
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
      .then((res) => {
        // console.log(res);
        const spotsRemaining = getSpotsRemaining(state, appointments);
        // console.log(spotsRemaining);
        const days = state.days.map(day => {
          if (day.name === state.day) {
            return { ...day, spots: spotsRemaining };
          } else {
            return day;
          }
        });

        // save to state and overwrite new appointments (save button)
        setState({
          ...state,
          appointments,
          days
        });
      })
  }

  const setDay = day => {
    setState({ ...state, day })
  };

  useEffect(() => {
    Promise.all([
      axios.get("api/days"),
      axios.get('api/appointments'),
      axios.get('api/interviewers')
    ]).then(all => {
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;

      setState(prev => ({ ...prev, days, appointments, interviewers }));
    });
  }, [])

  return { state, setDay, bookInterview, cancelInterview };
}