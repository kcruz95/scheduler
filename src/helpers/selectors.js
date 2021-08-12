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
  const interviewersIDForDay = state.days.find(day => day.name === givenDay);
  if (!state.days.length || !interviewersIDForDay) {
    return [];
  }
  /*
  1) find day {} for the given day
  2) search for state.interviewers and match for ids in day.interviewers
  3) create an array of those interviewer {}
  i.e. [{}, {}]

  we changed ln 14 but come back to it in the future

  for each day pass the appropriate interviewers[] that way the children are getting the [] and solves the error
  */

  const markedInterviewers = interviewersIDForDay.appointments.map((id) => {
    return state.appointments[id];
  });
  return markedInterviewers;
}

export function getInterview(state, interview) {
  const output = {};
  if (!interview) {
    return null;
  }
  // console.log(state);

  output['student'] = interview.student;
  output['interviewer'] = state.interviewers[interview.interviewer];

  return output;
};