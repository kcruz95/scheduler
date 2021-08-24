import "components/Application.scss";
import Appointment from "components/Appointment";
import DayList from "./DayList";

import React from "react";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

export default function Application() {
  const { state, setDay, bookInterview, cancelInterview } = useApplicationData();

  // in case it bugs out, originally referred to as "appointments"
  const appointmentsList = getAppointmentsForDay(state, state.day);
  const getInterviewersList = getInterviewersForDay(state, state.day);


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
        data-testid="appointment"
      />
    );
  });


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
        {schedule}
        <Appointment id="last" time="5pm" />
      </section>
    </main>
  );
}