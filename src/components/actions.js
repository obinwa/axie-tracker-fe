const Actions = ({ deleteHandler, editHandler }) => {
  return (
    <>
      <ul>
        <li onClick={editHandler}>Edit</li>
        <li onClick={deleteHandler}>Delete</li>
      </ul>
    </>
  );
};

export default Actions;
