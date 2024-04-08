import { useState } from 'react';
import SelectCategory from './SelectCategory';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { getAuth, getIdToken } from "firebase/auth";


function AddMemory({isOpen,onClose}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [image, setImage] = useState(null);
  const [date,setDate] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const auth = getAuth();
  const user = auth.currentUser;
  

  const handleSaveChanges = async () => {
    // Create FormData object to compile the form data
    const formData = new FormData();
    formData.append('memoryName', title);
    formData.append('entryDetail', details);
    formData.append('memoryDate', date ? date.toISOString() : ''); // Assuming `date` is a Date object or similar
    const token = await getIdToken(user);
    formData.append('userId', user.uid);
    formData.append('islandId', selectedCategoryId); 
    if (image) formData.append('artifact', image); // 'artifact' is the field for the image file
  
    // Construct the request options
    const requestOptions = {
      method: 'POST',
      body: formData, // The body of the request is the FormData object
      // Note: Don't manually set Content-Type for FormData; the browser will do it correctly
    };
  
    try {
      // Perform the fetch request to your API endpoint
      const response = await fetch('http://127.0.0.1:5000/createMemory', requestOptions);
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // Handle success
      console.log("Memory created successfully");
      setIsDialogOpen(false); // Assuming you use this state to close a dialog or form
      onClose();

      // Optionally, clear the form fields or provide further user feedback
      setTitle('');
      setDetails('');
      setDate(null);
      setSelectedCategoryId(null);
      setImage(null);
    } catch (error) {
      // Handle errors
      console.error("Error creating memory:", error);
      // Provide error feedback to the user
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleDialogOpen = (isOpen, categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  return (
    <div className={`w-full h-full bg-black ${isOpen ? 'bg-opacity-50' : 'bg-opacity-0'} z-20 flex justify-center items-center`}>
    <SelectCategory setIsDialogOpen={setIsDialogOpen} setSelectedCategoryId ={setSelectedCategoryId}/>
    {isDialogOpen && (
      <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center">
      <div className="grid max-w-screen-xl grid-cols-1 gap-8 px-8 py-16 mx-auto rounded-lg md:grid-cols-2 md:px-12 lg:px-16 xl:px-32 bg-orange-100 dark:text-gray-800 relative">
       <button onClick={() => setIsDialogOpen(false)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>     
<div className="flex flex-col justify-between">
          <div className="space-y-2">
            <h2 className="text-gray-600 text-4xl font-bold leading-tight lg:text-5xl">Add Memory</h2>
            <div className="text-gray-600">Record your memory here.</div>
          </div>
         {image && (
                <img src={URL.createObjectURL(image)} alt="Memory Image" className="p-6 max-w-full max-h-96 w-full h-auto" />
        )}
      </div>
      <form noValidate="" className="space-y-6">
        <div>
          <label htmlFor="name" className="text-sm text-black">Memory Title</label>
          <input type="text" placeholder="Enter memory title" className="text-gray-600 w-full p-3 rounded dark:bg-gray-100 focus:outline-none focus:ring focus:ring-orange-500" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
            <label htmlFor="date" className="text-sm focus:outline-none focus:ring focus:ring-orange-500"></label>
            <div className = "text-sm focus:outline-none focus:ring-orange-400">
                <Calendar date={date} setDate={setDate} className = "focus:outline-none focus:ring focus:ring-orange-500" />
            </div>      
        </div>
        <div>
        <input
            type="file"
            className="hidden text-gray-600"
            accept="image/*"
            id="image" // Add an id to the input element
            onChange={handleImageChange}
        />
        <label
            htmlFor="image"
            className="w-full p-3 text-sm font-bold tracking-wide uppercase rounded border border-orange-400 bg-orange-300 text-white hover:bg-orange-600 hover:border-orange-600 cursor-pointer"
        >
            {image ? 'Change Image' : 'Add Image'}
        </label>
    </div>      
    <div>
          <label htmlFor="details" className="text-sm text-black">Details</label>
          <textarea rows="3" className="w-full p-3 text-gray-600 rounded dark:bg-gray-100 focus:outline-none focus:ring focus:ring-orange-500" placeholder="Enter memory details" value={details} onChange={(e) => setDetails(e.target.value)} />
        </div>
        <button
        type="button"
        className="w-full p-3 text-sm font-bold tracking-wide uppercase rounded border border-orange-400 bg-orange-300 text-white hover:bg-orange-600 hover:border-orange-600"
        onClick={handleSaveChanges}
        >
        Create
        </button>

      </form>
    </div>
    </div>
      )}
    </div>
  );
}

function Calendar({ date, setDate }) {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
        label="Date"
        value={date}
        onChange={(newDate) => setDate(newDate)}
        textField={(props) => (
          <TextField {...props} variant="outlined" fullWidth />
        )}
      />
      </LocalizationProvider>
    );
  }
  
export default AddMemory;
