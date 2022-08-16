import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import priceTagSvg from "../assets/pricetag.svg";
import ClipLoader from "react-spinners/ClipLoader";

import { setCurrentListing } from "../actions/actions";
import axios from "axios";
import { UserContext } from "../App";

const ListingForm = () => {
  const api = 'https://lime-market-backend.herokuapp.com'
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const user = JSON.parse(sessionStorage.getItem("user"));
  const token = sessionStorage.getItem("token");
  const [listingData, setListingData] = useState({
    title: "",
    price: 0,
    description: "",
  });
  const [listingImages, setListingImages] = useState({});
  console.log(listingData);
  console.log(listingImages);
  const [loading, setLoading] = useState(false);

  // const [files, setFiles] = useState({})
  // console.log(files)
  const currentListing = useSelector((state) => state.currentListing);
  console.log(currentListing);
  const [currentListingImages, setCurrentListingImages] = useState();
  const listingId = currentListing?.id;
  const dispatch = useDispatch();
  const [redirect, setRedirect] = useState(false);
  const [redirectId, setRedirectId] = useState("");

  const [errors, setErrors] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
  });
  console.log(errors);
  // useEffect(() => {
  //     currentListing &&
  //     setRedirectId(currentListing)
  //     setListingData({ ...listingData, title: listing?.title, description: listing?.description, price: listing?.price, selectedFile: listing?.selectedFile })
  // }, [currentListing])

  const clear = () => {
    dispatch(setCurrentListing([]));
    setListingData({ title: "", description: "", price: "", selectedFile: "" });
  };

  const validate = () => {
    // Error checks
    let titleError = null;
    let priceError = null;
    let descriptionError = null;
    let imageError = null;

    if (listingData.title.length < 5) {
      titleError = "Title must be at least 5 characters long";
    }
    if (parseInt(listingData.price) < 1 || listingData.price.length === 0) {
      priceError = "Price must be at least $1 (dollar)";
    }
    if (
      (listingData.description.length < 10) |
      (listingData.description.length > 250)
    ) {
      descriptionError =
        "Description must be between 10 and 250 characters long";
    }
    if (listingImages.length < 1) {
      imageError = "At least one image must be uploaded";
    }
    if (titleError || priceError || descriptionError || imageError) {
      setErrors({
        title: titleError,
        price: priceError,
        description: descriptionError,
        image: imageError,
      });
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (validate() === false) {
      setLoading(false);
      return;
    }
    let formData = new FormData();
    formData.append("title", listingData.title);
    formData.append("description", listingData.description);
    formData.append("price", parseInt(listingData.price));
    for (let image in listingImages) {
      formData.append(`image${parseInt(image) + 1}`, listingImages[image]);
    }

    // formData.append('image1', listingImages.image1)
    // formData.append('image2', listingImages.image2)
    // formData.append('image3', listingImages.image3)
    // formData.append('image4', listingImages.image4)
    formData.append("creator", user?.username);
    formData.append("creator_img", user?.profile_img);

    const updatedListings = currentUser?.listings_created.filter(
      (listing) => listing.id !== listingId
    );

    if (currentListing.length === 0) {
      // Create
      axios
        .post(`${api}/listings/create`, formData, {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then(async (response) => {
          console.log(response);
          setRedirectId(response.data.id);
          const userListings = [...user?.listings_created, response.data];
          await axios.patch(
            `${api}/users/update/${user?.username}`,
            {
              listings_created: userListings,
            },
            {
              headers: {
                Authorization: `Token ${token}`,
              },
            }
          );
        })
        .then(() => {
          clear();
          setLoading(false);
          setRedirect(true);
        })
        .catch((error) => {
          setLoading(false);
        });
    } else {
      // Edit
      // Remove listing to edit from user data listings_created
      axios
        .patch(
          `${api}/users/update/${user?.username}`,
          {
            listings_created: updatedListings,
          },
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        )
        // .then(async() => {
        //     await axios.get(`${api}/users/view/${user?.username}`)
        // })
        .then(async (response) => {
          console.log(response);
          console.log(user);
          await axios
            .patch(
              `${api}/listings/update/${listingId}`,
              formData,
              {
                headers: {
                  Authorization: `Token ${token}`,
                  "Content-Type": "multipart/form-data",
                },
              }
            )
            .then(async (response) => {
              console.log(response);
              // setRedirectId(response.data.id.toString())
              const userListings = [...updatedListings, response.data];
              await axios
                .patch(
                  `${api}/users/update/${user?.username}`,
                  {
                    listings_created: userListings,
                  },
                  {
                    headers: {
                      Authorization: `Token ${token}`,
                    },
                  }
                )
                .then((response) => {
                  sessionStorage.setItem("user", JSON.stringify(response.data));
                  setRedirectId(listingId);
                })
                .then(() => {
                  clear();
                  setCurrentUser(JSON.parse(sessionStorage.getItem("user")));
                  setLoading(false);
                  setRedirect(true);
                  // window.location.reload()
                });
            });
        })
        .catch((error) => {
          setLoading(false);
          console.log(error.message)
        });
    }
  };

  // function checkFiles(files) {   
  //   console.log(files)    
  //   if(files.length>3) {
  //       alert("length exceeded; files have been truncated");

  //       let list = new DataTransfer;
  //       for(let i=0; i<10; i++)
  //          list.items.add(files[i]) 

  //       document.getElementById('files').files = list.files
  //   }       
  // }

  useEffect(() => {
    if (currentListing.length !== 0) {
      let imageURLs = [
        currentListing?.image1,
        currentListing?.image2,
        currentListing?.image3,
      ];
      imageURLs = imageURLs.filter((el) => el !== null);
      console.log(imageURLs);
      let images = {};
      imageURLs?.forEach(async (el, i) => {
        const imgURL = await fetch(el);
        console.log(imgURL);
        const blob = await imgURL.blob();
        console.log(blob);
        const fileName = el?.slice(el.lastIndexOf("/") + 1);
        console.log(fileName);
        const file = new File([blob], fileName, { type: blob.type });
        images[i] = file;
        console.log(images);
      });
      // set listingImages state to images object from above
      setListingImages(images);
      console.log(listingImages);
      setListingData({
        title: currentListing?.title,
        price: currentListing?.price,
        description: currentListing?.description,
      });
      setCurrentListingImages({
        image1: currentListing?.image1,
        image2: currentListing?.image2,
        image3: currentListing?.image3,
      });
    }
  }, []);

  return (
    <>
    <div className="form">
      <div className="form-top">
        <img className="form-svg-top" src={priceTagSvg}></img>
      </div>
      <div className="form-form">
        <h1>{currentListing.length !== 0 ? `Edit` : `Create`} Listing</h1>
        {redirect && <Redirect to={`/listings/${redirectId}`} />}
        <form>
          {/* Title */}
          <label for="title">
            <h4>Title:</h4>
          </label>
          <input
            className="form-title-input"
            id="title"
            name="title"
            type="text"
            value={listingData.title}
            onChange={(e) =>
              setListingData({ ...listingData, title: e.target.value })
            }
          />
          <div className="error-div">
            {<p className="error">{errors.title}</p>}
          </div>

          {/* Price */}
          <label for="price">
            <h4>Price:</h4>
          </label>
          <div className="form-input">
            <h2>$</h2>
            <input
              className="form-price-input"
              id="price"
              name="price"
              type="number"
              placeholder="Price"
              value={listingData.price}
              onChange={(e) =>
                setListingData({ ...listingData, price: e.target.value })
              }
            />
          </div>
          <div className="error-div">
            {<p className="error">{errors.price}</p>}
          </div>

          {/* Description */}
          <label for="description">
            <h4>Description:</h4>
          </label>
          <textarea
            className="form-desc-textarea"
            id="description"
            name="description"
            value={listingData.description}
            onChange={(e) =>
              setListingData({ ...listingData, description: e.target.value })
            }
          />
          <div className="error-div">
            {<p className="error">{errors.description}</p>}
          </div>

          {/* Image File Upload */}
          <label for="files">
            <h4>Images: (Select up to 3 images)</h4>
          </label>
          <input
            className="file-input"
            type="file"
            id="files"
            name="files"
            accept="image/png, image/jpeg"
            multiple
            data-max-files="3"
            onChange={(event) => {
              if (Array.from(event.target.files).length > 3) {
                event.preventDefault();
                alert(`Cannot upload more than 3 images. Please try again.`);
                return;
              }
              console.log(event.target.files);
              if (currentListing) {
                console.log("dispatched");
                setCurrentListingImages({
                  image1: null,
                  image2: null,
                  image3: null,
                });
                console.log(currentListing);
              }
              if (event.target.files) {
                // Empty array to remove previous files onchange
                listingImages.length = 0;
                // initialize empty images object
                let images = {};
                // add imgfiles to images object
                for (let file in event.target.files) {
                  images[file] = event.target.files[file];
                }
                // set listingImages state to images object from above
                setListingImages(images);
                console.log(listingImages);
              }
            }}
          />
          <div className="error-div">
            {<p className="error">{errors.image}</p>}
          </div>

          {/* Files Preview Div */}

          <h4>Image Preview:</h4>
          <div className="form-files">
            {listingImages[0] ? (
              <img
                className="files-img"
                src={URL.createObjectURL(listingImages[0])}
              />
            ) : currentListingImages?.image1 ? (
              <img className="files-img" src={currentListingImages?.image1} />
            ) : <img className="files-img" src="https://limemarketstatic.s3.us-west-1.amazonaws.com/media/patternpad.jpeg" />}
            {listingImages[1] ? (
              <img
                className="files-img"
                src={URL.createObjectURL(listingImages[1])}
              />
            ) : currentListingImages?.image2 ? (
              <img className="files-img" src={currentListingImages?.image2} />
            ) : <img className="files-img" src="https://limemarketstatic.s3.us-west-1.amazonaws.com/media/patternpad.jpeg" />}
            {listingImages[2] ? (
              <img
                className="files-img"
                src={URL.createObjectURL(listingImages[2])}
              />
            ) : currentListingImages?.image3 ? (
              <img className="files-img" src={currentListingImages?.image3} />
            ) : <img className="files-img" src="https://limemarketstatic.s3.us-west-1.amazonaws.com/media/patternpad.jpeg" />}
          </div>

          {/* <input type="file" multiple={true} onChange={(event) => setListingData({ ...listingData, selectedFile: event.target.files[0] })}></input> */}
              
          { 
            loading
            ?
            <div className="button-secondary center-button">
              {currentListing.length !== 0 ? `Editing...` : `Creating...`} Please Wait
              <ClipLoader color="grey" loading={loading} size={15} />
            </div>
            :
            <button
            className="button-primary"
            type="submit"
            style={{ marginTop: 25 }}
            onClick={handleSubmit}
            >
              Submit
            </button>
          }
          
        </form>
      </div>
      <div className="form-bg">
        <img className="form-svg" src={priceTagSvg}></img>
      </div>
    </div>
    </>
  );
};

export default ListingForm;
