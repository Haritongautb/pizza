import React from "react";
import { useDispatch } from "react-redux";

import debounce from "lodash.debounce";
import styles from "./search.module.scss";
import { setSearch } from "../../redux/slices/filter/slice";

export const Search: React.FC = () => {
  // II. данный state делается для сохранении текущего value для input, иначе если input будет брать search, то там ничего не будет, так как debounce срабатывает через 1мин и event.target.value через 1 мин будет пуст, то есть этот useSTate был создан для контроли value у input
  // II. По сути это для быстрого получения value и затем передать сразу в input
  const [value, setValue] = React.useState<string>("");

  // II. По сути это для передачи поиска для работы debounce

  // const { search, onHandleChangeSearch } = useContext(SearchContext);
  const dispatch = useDispatch();
  // В inputRef будет хранится ссылка на наш input, то есть на DOM элемент
  const inputRef = React.useRef<HTMLInputElement>(null);

  // I. Для чего здесь useCallback()
  // Если не использовтаь useCallback, то при каждом render onChangeInput будет вызываться и тогда debounce будет работать - значит будут отправляться запросы, и мы просто потеряем смысл работы этого метода. Таким образом useCallback() сохраняет ссылку на функцию один раз и при каждом render данного компонента функция updateSearchValue не будет вызываться и отправляться запрос
  const updateSearchValue = React.useCallback(
    debounce((str: string) => {
      console.log(str);
      // II.Теперь проблема в том, что debounce срабатывается только через 1мин и в event.target.value - пустота, и мы передаем пустоту и поэтому в search - ничего нет.В таком случае создаем еще один useState с value
      dispatch(setSearch(str));
    }, 700),
    []
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  // I. зачем нужен useRef
  // Мы сейчас хотим, чтобы при удалении в input, когда нажимаем на крестик focus снова был в input
  // Мы могли бы сделат так
  const onClickClear = (event: React.MouseEvent<SVGSVGElement>) => {
    setValue("");
    dispatch(setSearch(""));
    // I. Так нельзя делаать в react
    // Так лучше не делать, потому что мы не через react обращаемся к DOM элементам, а через обычный JS document, и в таком случае может произойти баг или элемент мог не найтись, он мог не отрендерться или быстрее всех отрендерился. Для таких случаев используется специальный хук при работе с отдельным DOM элементом - useRef
    /* document.querySelector('input').focus(); */

    // I. с помощью useRef()
    // II. Здесь if для проверки на существования inputRef.current, потому что у нас возможно будет еще null при первоначальном render (то, что мы указали null)
    //  либо так
    /*         if(inputRef.current){
            inputRef.current.focus();
        } */

    // либо так
    inputRef?.current?.focus();
  };

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        enableBackground="new 0 0 32 32"
        id="EditableLine"
        version="1.1"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="14"
          cy="14"
          fill="none"
          id="XMLID_42_"
          r="9"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <line
          fill="none"
          id="XMLID_44_"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
          x1="27"
          x2="20.366"
          y1="27"
          y2="20.366"
        />
      </svg>
      <input
        ref={inputRef}
        className={styles.input}
        type="text"
        placeholder="Search pizza"
        value={value}
        onChange={onChangeInput}
      />
      {value && (
        <svg
          onClick={onClickClear}
          className={styles.clearIcon}
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
        </svg>
      )}
    </div>
  );
};
