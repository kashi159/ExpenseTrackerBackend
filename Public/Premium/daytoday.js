const homeBtn = document.getElementById('homebtn');
const downloadBtn = document.getElementById('download');
const tableBody = document.getElementById("table-body");
const token = localStorage.getItem('token');
const table= document.getElementById('table-body')
const tableDown = document.getElementById('download-body')

homeBtn.addEventListener('click', function home(){
    window.location.href="../ExpenseTracker/index.html"
});

window.addEventListener("DOMContentLoaded", async()=> {
    try{
      const response = await axios.get("http://localhost:4000/user/expense", { headers: {"Authorization" : token }})
      response.data.forEach(expense => {
        const newRow = createTableRow(expense);
        table.appendChild(newRow);
      })
      const links = await axios.get("http://localhost:4000/user/downloadlink", { headers: {"Authorization" : token }})
      links.data.forEach(link =>{
        const newRow = downloadTableRow(link);
        tableDown.appendChild(newRow);
      })
    } catch (err){
      console.error(err)
    }
  })
  
  function createTableRow(expense) {
    const expenseDate = new Date(expense.createdAt);
    const dayOfWeek = expenseDate.toLocaleString("en-US", { weekday: "long" });
    const dateOfMonth = expenseDate.getDate();
    const year = expenseDate.getFullYear();
    const dayAndDate = `${dayOfWeek}, ${dateOfMonth}, ${year}`;
    const incomeValue = expense.income ? expense.income : 0;
  
    const row = document.createElement("tr");
    const dateCell = document.createElement("td");
    const descriptionCell = document.createElement("td");
    const categoryCell = document.createElement("td");
    const incomeCell = document.createElement("td");
    const amountCell = document.createElement("td");
  
    dateCell.textContent = dayAndDate;
    descriptionCell.textContent = expense.description;
    categoryCell.textContent = expense.category;
    incomeCell.textContent = incomeValue;
    amountCell.textContent = expense.amount;
  
    row.appendChild(dateCell);
    row.appendChild(descriptionCell);
    row.appendChild(categoryCell);
    row.appendChild(incomeCell);
    row.appendChild(amountCell);
  
    return row;
  }

  function downloadTableRow(link) {
    const linkDate = new Date(link.createdAt);
    const dayOfWeek = linkDate.toLocaleString("en-US", { weekday: "long" });
    const dateOfMonth = linkDate.getDate();
    const year = linkDate.getFullYear();
    const dayAndDate = `${dayOfWeek}, ${dateOfMonth}, ${year}`;
  
    const row = document.createElement("tr");
    const dateCell = document.createElement("td");
    const linkCell = document.createElement("td");
  
    dateCell.textContent = dayAndDate;
    
    const linkElem = document.createElement("a");
    linkElem.href = link.fileURL;
    linkElem.target = "_blank";
    linkElem.textContent = "Download";
    linkCell.appendChild(linkElem);
  
    row.appendChild(dateCell);
    row.appendChild(linkCell);
  
    return row;
  }
  
  



downloadBtn.addEventListener('click', onDownload);

async function onDownload(){
    try{
        const response = await axios.get('http://localhost:4000/user/download', { headers: {"Authorization" : token} })
        // console.log(response)
        if(response.status === 201){
            
            var a = document.createElement("a");
            a.href = response.data.fileURL;
            a.download = 'myexpense.csv';
            a.click();
        } else {
            throw new Error(response.data.message)
        }
    }catch(err) {
        showError(err)
    };
}
