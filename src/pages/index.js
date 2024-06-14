import styles from '@/styles/Home.module.css';
import { useState } from 'react';
import axios from 'axios'
import Box from '@mui/material/Box';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';

export default function Home() {
  const [treeData, setTreeData] = useState([]);
  const [membersResults, setMembersResults] = useState([])
 const TEMPAR  = [];
const MUI_X_PRODUCTS = [];
if (membersResults.fetchedUsers  ) {
  MUI_X_PRODUCTS.push({
    id: membersResults.fetchedUsers[0].ID,
    label:  membersResults.fetchedUsers[0].Name + " " +  membersResults.fetchedUsers[0].Family,
    children: [{ 
    id: membersResults.fetchedUsers[1].ID,
    label:  membersResults.fetchedUsers[1].Name + " " +  membersResults.fetchedUsers[1].Family,
    children: [],
  },
]
},
);
for (var i = 0 ; i < membersResults.fetchedUsers.length; i++ ) { 
if ( membersResults.fetchedUsers[i].FatherID > 0 || membersResults.fetchedUsers[i].MotherID > 0 ) {
TEMPAR.push({
  id: membersResults.fetchedUsers[i].ID,
  name: membersResults.fetchedUsers[i].Name ,
 family:  membersResults.fetchedUsers[i].Family ,
 fatherid: membersResults.fetchedUsers[i].FatherID,
 motherid: membersResults.fetchedUsers[i].MotherID,
 sex: membersResults.fetchedUsers[i].sexId,
 },
); 
}
}

for (var i = 0 ; i < TEMPAR.length; i++ ) { 
 findChildById(TEMPAR[i].id , TEMPAR[i].name , TEMPAR[i].family , TEMPAR[i].sex ) ;
  }
}

function findChildById(id , name , family ,  sex) {
  for (let i = 0; i < TEMPAR.length ; i++ ) {
 if ( sex === 0 ){ 
 if ( TEMPAR[i].fatherid === id ) {
//console.log ( "yes " +name + "  is father of " + TEMPAR[i].name);
 const parent = (  findNodeById(MUI_X_PRODUCTS, id)   );
    const newchild =  {
    id: TEMPAR[i].id,
    label:   TEMPAR[i].name + " " +  TEMPAR[i].family,
    children: [],
  };
  addChildToNode(MUI_X_PRODUCTS, TEMPAR[i].fatherid ,  newchild )   
  }
  }
  else {
 if ( TEMPAR[i].motherid === id ) {
 // console.log ( "yes " +name + " is Mother of " + TEMPAR[i].name);
  const parent = (  findNodeById(MUI_X_PRODUCTS, id)   );
  const newchild =  {
    id: TEMPAR[i].id,
    label:   TEMPAR[i].name + " " +  TEMPAR[i].family,
    children: [],
  };
  addChildToNode(MUI_X_PRODUCTS, TEMPAR[i].motherid ,  newchild )   
  }
  }
}
}

function findNodeById(tree, id) {
  for (const node of tree) {
    if (node.id === id) {
      return node;
    }
    if (node.children.length > 0) {
      const found = findNodeById(node.children, id);
      if (found) {
        return found;
      }
    }
  }
  return null;
}

function addChildToNode(tree, parentId, newChild) {
  const parentNode = findNodeById(tree, parentId);
  if (parentNode) {
    parentNode.children.push({
      ...newChild,
      children: [], 
    });
    return true;
  } else {
    return false;
  }
}
const getMembers = async () => {
   try {
     const fetchedMembers = await axios.request('http://localhost:3000/api/userV1/user').then((res) => {
       setMembersResults(res.data);
     });
   } catch (error ) {
    console.log(error);
   }
 };

 return (
  <>
    <main className={styles.main}>
      <div className={styles.description}>
       <div>
          <button onClick={getMembers}> Display Family Members </button>
          <div className={styles.description}>
        {membersResults.fetchedUsers && membersResults.fetchedUsers.length > 0 && (      
          
          <Box sx={{ height: 264, flexGrow: 1, maxWidth: 400 }}>
          <RichTreeView
            defaultExpandedItems={MUI_X_PRODUCTS.map((x) => x.id)}
            multiSelect={true}
            checkboxSelection={true}
            items={MUI_X_PRODUCTS}
          />
        </Box>
        )}
        </div>
       </div>
      </div>
    </main>
  </>
);
}
