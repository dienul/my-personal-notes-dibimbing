import Card from "react-bootstrap/Card";
import { AiFillDelete, AiTwotoneEdit,  AiOutlineStar, AiFillStar, } from "react-icons/ai";
import { DataContext } from "../../App";
import { useContext } from "react";
import { showFormattedDate } from "../../utils"



const CardGroup = ({data, handleEditNote, handleDeleteNote, handleArchivedNote}) => {
  const {title, body, createdAt} = data
  const dataLogin = useContext(DataContext);

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body style={{height: "200px", overflow: "hidden", textOverflow:"ellipsis"}}>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted" style={{fontSize: "12px"}}>{showFormattedDate(createdAt)}</Card.Subtitle>
        <Card.Text>{body}</Card.Text>
      </Card.Body>
      {dataLogin.isLogin && (
        <Card.Body className="d-flex gap-1">
          <AiTwotoneEdit className="icon" cursor="pointer" onClick={()=> handleEditNote(data)}/>
          <AiFillDelete className="icon" cursor="pointer" onClick={() => handleDeleteNote(data.id)}/>
          {data.archived ? (
              <AiFillStar className="icon" size={25} cursor="pointer" onClick={() => handleArchivedNote(data)}/>
            ) : (
              <AiOutlineStar className="icon" size={25} cursor="pointer" onClick={() => handleArchivedNote(data)}/>
            )}
        </Card.Body>
      )}
    </Card>
  );
};

export default CardGroup;
