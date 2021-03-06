import React from 'react';
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Confirm from "components/Appointment/Confirm";
import Status from "components/Appointment/Status"
import Error from 'components/Appointment/Error';
import useVisualMode from 'hooks/useVisualMode';

import "components/Appointment/styles.scss"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const SAVING = "SAVING";
const DELETING = "DELETING";
const ERROR_DELETE = "ERROR_DELETE";
const ERROR_SAVE = "ERROR_SAVE"

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    if (!interviewer) {
      // setError("Select an interviewer to save");
      return;
    }

    transition(SAVING);

    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  }

  function remove(event) {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch(error => {
        transition(ERROR_DELETE, true)
      });
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
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
        mode === SAVING && (
          <Status message="Saving..." />
        )
      }
      {
        mode === ERROR_SAVE && (
          <Error
            message="Saving Unsuccessful: Error"
            onCancel={back}
          />
        )
      }
      {
        mode === DELETING && (
          <Status message="Deleting..." />
        )
      }
      {
        mode === ERROR_DELETE && (
          <Error
            message="Deleting Unsuccessful: Error"
            onCancel={() => transition(SHOW)}
          />
        )
      }
      {
        mode === EDIT && (
          <Form
            name={props.interview.student}
            interviewer={props.interview.interviewer.id}
            interviewers={props.interviewers}
            onCancel={() => transition(SHOW)}
            onSave={save}
          />
        )
      }
    </article>
  )
}