import React from 'react'
import axios from 'axios'
import { Menu,Tag, Typography } from 'antd';


const { Text } = Typography;
const { CheckableTag } = Tag;
const { SubMenu } = Menu;

const menuData = ['area', 'color', 'division', 'section', 'style'];
const styles = { backgroundColor: 'white' };
let arr = [];

function SideBar(props) {
    const [elements, setElements] = React.useState();
    const [selectedTags, setSelectedTags] = React.useState([]);
    const [param, setParam] = React.useState([]);

    /**
     * Function
     */
    const fetchElements = React.useCallback(async () => {
        const ret = await axios.get('/api/elements');
        setElements(ret.data.data[0]);
      }, []);
    
    const objectToQuerystring =  (menu, tag, checked) => {
        if (checked) {
            arr[menu] = Object.keys(param).indexOf(menu) !== -1 ? [...param[menu], tag] : [tag];
             setParam(arr);
          } else {
            for (let [key, value] of Object.entries(arr)) {
              if (menu === key) {
                value.splice(value.indexOf(tag), 1);
                value.length === 0 ? delete arr[menu] : arr[menu] = value;
                 setParam(arr);
              }
            }
          }
        return Object.keys(arr).reduce(function (str, key, i) {
        var delimiter, val;
        delimiter = (i === 0) ? '?' : '&';
        key = encodeURIComponent(key);
        val = encodeURIComponent(arr[key]);
        return [str, delimiter, key, '=', val].join('');
        }, '');

    }
   
    const onTagChange =  (menu, tag, checked) => { /** if tag is checked, fetch case data */
        const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
        const queryString =  objectToQuerystring(menu, tag, checked);

        setSelectedTags(nextSelectedTags);    
        axios.get('/api/cases' + queryString).then( res => props.setCaseData(res.data.data));    
    }


    React.useLayoutEffect(() => {
        fetchElements();
    }, [fetchElements]);
    
    /**
     * Rendering
     */
    return (
            <Menu mode="inline"  /* onOpenChange={onOpenChange}  */
            style={{ width: 250, height: '100%' }} inlineIndent={10}>
               {elements && 
                    menuData.map( (menu, index) => {
                        let key = `sub${index+1}`;
                         return (
                            <SubMenu key={key} title={menu}>
                                <Menu.Item key={index+1} style={styles}>
                                {elements[menu].map(element => {
                                        return (
                                            <CheckableTag 
                                                    key={element} 
                                                    checked={selectedTags.indexOf(element) > -1}
                                                    onChange={checked => onTagChange(menu, element, checked)}
                                                    style={{/* border: "1px solid #00a6d1", */ marginLeft: '0.5rem'}}>
                                                
                                                <Text style={{fontSize: '14px'}}>{element}</Text>
                                            </CheckableTag> 
                                        )
                                    }) 
                                }
                                </Menu.Item>
                            </SubMenu>  
                        )  
                    })
                } 
            </Menu>

    )
}

export default React.memo(SideBar)