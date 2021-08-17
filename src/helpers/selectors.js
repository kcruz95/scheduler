export function getAppointmentsForDay(state, givenDay) {

  const pickedDay = state.days.find(day => day.name === givenDay);
  if (!state.days.length || !pickedDay) {
    return [];
  }

  const markedAppointments = pickedDay.appointments.map((id) => {
    return state.appointments[id];
  });
  return markedAppointments;
}

export function getInterviewersForDay(state, givenDay) {
  const daysObj = state.days.find(day => day.name === givenDay);
  if (!state.days.length || !daysObj) {
    return [];
  }

  const interviewersIDForDay = daysObj.interviewers

  return interviewersIDForDay.map(interviewerId => {
    return state.interviewers[interviewerId]
  })
}

export function getInterview(state, interview) {
  const output = {};
  if (!interview) {
    return null;
  }

  output['student'] = interview.student;
  output['interviewer'] = state.interviewers[interview.interviewer];

  return output;
};