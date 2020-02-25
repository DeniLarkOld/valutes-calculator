import React from 'react';

export const ModalSetPairValues = (props) => {
  const refForm = React.createRef();

  const handleSubmit = e => {
    e.preventDefault();
    props.actionSetValuesPairsModal(false);
  }

  const handleAddPair = () => {
    let first = {};
    let second = {};
    refForm.current.firstInPair.forEach(el => {
      if(el.checked) {
        first.code = el.value;
        first.title = el.getAttribute('data-title');
      }
    });
    refForm.current.secondInPair.forEach(el => {
      if(el.checked) {
        second.code = el.value;
        second.title = el.getAttribute('data-title');
      }
    });
    const pair = {
      id: first.code + second.code,
      pair: [first, second]
    };
    
    props.actionAddValuesPair(pair);
  }

  return(
    <div className="modal">
            <div className="modal--favorite-values">
                <div className="modal__header">
                    <h2>Добавьте интересующие валютные пары</h2>
                </div>
                <div className="modal__content">
                  <form 
                    ref={refForm} 
                    id="form-set-values-pair"
                    onSubmit={handleSubmit}
                  >
                    <div>
                      {props.valuesList.map(el => {
                          return(
                            <div key={el.code}>
                              <input 
                                type="radio"
                                name="firstInPair"
                                value={el.code}
                                data-title={el.title}
                                id={el.code}
                              />
                              <label htmlFor={el.code}>{el.code} &nbsp; {el.title}</label>
                            </div>
                          )
                        })
                      }
                    </div>
                    <div>
                    {props.valuesList.map(el => {
                          return(
                            <div key={el.code}>
                              <input 
                                type="radio"
                                name="secondInPair"
                                value={el.code}
                                data-title={el.title}
                                id={el.code + '-secondInPair'}
                              />
                              <label htmlFor={el.code + '-secondInPair'}>{el.code} &nbsp; {el.title}</label>
                            </div>
                          )
                        })
                      }
                    </div>

                    <div>
                      {props.saveValuesPair(props.valuesPairs)}
                      {props.valuesPairs.map((el) => {
                        return(
                          <div key={el.id}>
                            {el.pair[0].code} / {el.pair[1].code}
                            <button onClick={props.actionDeleteValuePair.bind(null, el.id)}>&times;</button>
                          </div>
                        )
                      })}
                    </div>
                  </form>
                </div>
                <div className="modal__footer">
                  <button form="form-set-values-pair">OK</button>
                  <button onClick={handleAddPair}>ADD</button>
                </div>
            </div>
        </div>
  )
}