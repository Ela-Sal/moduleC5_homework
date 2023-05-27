const parser = new DOMParser()

const xmlString = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
`;
const xmlDOM = parser.parseFromString(xmlString, "text/xml");

const listNode = xmlDOM.querySelector("list");
const studentsNode = listNode.querySelectorAll("student");

const result = {
  list: []
}

studentsNode.forEach(studentNode =>{
const nameNode = studentNode.querySelector("name");
const firstNode = studentNode.querySelector("first");
const secondNode = studentNode.querySelector("second");
const ageNode = studentNode.querySelector("age");
const profNode = studentNode.querySelector("prof");
const langattr = nameNode.getAttribute("lang");
 

const student = {
  name: `${firstNode.textContent} ${secondNode.textContent}`, 
  age: Number(ageNode.textContent),
  prof: profNode.textContent,
  lang: langattr 
 }

result.list.push(student)   

})

console.log(result)