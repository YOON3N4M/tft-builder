import { useState } from "react";

/**
 * 툴팁, 모달, 아코디언메뉴 등 on/off 상태와 핸들링이 필요한 경우
 *
 * 간편하게 사용할 수 있는 hook
 *
 * Chakra ui 참고
 */
function useDisClosure() {
  const [isOpen, setIsOpen] = useState(false);

  function onOpen() {
    setIsOpen(true);
  }
  function onClose() {
    setIsOpen(false);
  }

  return {
    isOpen,
    onOpen,
    onClose,
  };
}

export default useDisClosure;
