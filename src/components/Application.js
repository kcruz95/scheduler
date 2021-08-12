import "components/Application.scss";
import Appointment from "components/Appointment";
import DayList from "./DayList";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

export default function Application() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  })

  function bookInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    // save to state and overwrite new appointments (save button)
    setState({
      ...state,
      appointments
    });
    axios.put(`/api/appointments/${id}`, interview).then((res) => {
      console.log(res);
    })  // make return SHOW : 204 No Content Response
  }

  function cancelInterview(id) {
    console.log('hello');
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    // save to state and overwrite new appointments (save button)
    setState({
      ...state,
      appointments
    });
    if (id) {
      // return onDelete?
    }
    return null;
  }

  const setDay = day => {
    setState({ ...state, day })
  };

  // in case it bugs out, originally referred to as "appointments"
  const appointmentsList = getAppointmentsForDay(state, state.day);
  const getInterviewersList = getInterviewersForDay(state, state.day);
  console.log(getInterviewersList);
  const schedule = appointmentsList.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        bookInterview={bookInterview}
        interviewers={getInterviewersList}
        cancelInterview={cancelInterview}
      />
    );
  });

  useEffect(() => {
    Promise.all([
      axios.get("api/days"),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then(all => {
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;
      console.log(getInterviewersForDay);
      setState(prev => ({ ...prev, days, appointments, interviewers }));
    });
  }, [])

  return (
    <main className="layout">
      <section className="sidebar">

        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />

        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          {
            <DayList
              days={state.days}
              day={state.day}
              setDay={setDay}
            />
          }
        </nav>

        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>

      <section className="schedule">
        {appointmentsList.map(appointment =>
          <Appointment key={appointment.id} {...appointment} interviewers={getInterviewersList} cancelInterview={cancelInterview} />)}
      </section>
    </main>
  );
}