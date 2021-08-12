import React from 'react';
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Confirm from "components/Appointment/Confirm";
import Status from "components/Appointment/Status"
import useVisualMode from 'hooks/useVisualMode';

import "components/Appointment/styles.scss"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const DELETING = "DELETING";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  console.log(props);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview)
  }

  function remove(event) {
    transition(DELETING, true);
    // props
    //   .cancelInterview(props.id)
    //   .then(() => {
    //     transition(EMPTY);
    //   })
    //   .catch(error => {
    //     transition(ERROR_DELETE, true)
    //   });
    props.cancelInterview(props.id);
  }


  return (
    <article className="appointment">
      <Header time={props.time} />
      {/* {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer} /> : <Empty onAdd={() =>
        transition(CREATE)
      } />} */}
      {
        mode === EMPTY && (
          <Empty
            onAdd={() =>
              transition(CREATE)
            }
          />
        )
      }
      {
        mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={() => transition(CONFIRM)}
            onEdit={() => transition(EDIT)}
          />
        )
      }
      {
        mode === CONFIRM && (
          <Confirm
            onCancel={() => transition(SHOW)}
            onConfirm={remove}
          />
        )
      }
      {
        mode === CREATE && (
          <Form
            interviewers={props.interviewers}
            onCancel={() =>
              back(EMPTY)
            }
            onSave={save}
          />
        )
      }
      {
        mode === DELETING && (
          <Status />
        )
      }
    </article>
  )
}