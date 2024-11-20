

document.getElementById('charityForm').addEventListener('submit',async(event)=>{
    event.preventDefault()
    const token=localStorage.getItem('token')
    const formData={
        name:event.target.name.value,
        description:event.target.description.value,
        location:event.target.location.value,
        category:event.target.category.value,
        goal:event.target.goal.value
    }
console.log("This is formdata",formData)
    try{
        const response =await axios.post('http://localhost:3000/charity/create',formData,{headers:{"Authorization":token}})
        console.log("heyyyy",response)
        alert("Charity created Successfully")
        window.location.href='/profile'
    }
    catch(error){
        console.error('Error creating charity:', error);
        alert('Failed to create charity.')
        console.log(response.error)

    }
})

