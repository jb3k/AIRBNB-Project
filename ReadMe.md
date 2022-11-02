# AirBnB Clone

FairBnb is a clone of AirBnb, the popular rental property app. In this app you are allowed to view properties that are being hosted by the app's users. Logged in users are able to create, update, and delete properties you want to host. Each property / spot you are allowed to view reviews on the current spot, and create or delete reviews if you are the user logged in user. 

Link to live site: https://airbnb-project-practice.herokuapp.com/

You can Navigate the the Schema in the the backend folder's Readme.md

# Welcome View:
![fairbnb-home-page](/home.png)

# Spot View:
![fairbnb-home-page](/spot.png)

# User Spot View:
![fairbnb-home-page](/user.png)


# Instructions:
If you only want to view, you can naviage to the home page or click on a specific property that you want to view. Logged in users will the capability to leave reviews for spots, create spots to host, update details of you spot and or delete the spot you are hosting. To login just the menu bar in the top right corner which will navigate you to form to sign up for new users or login for old users. 

# Key Features
• Create / Read / Update / Delete Properties

• Login / Logout functionality

• User database that keeps track of user properties

• Create Reviews on specific properties

• Read all the reviews on a specific property

• Delete reviews left by the current user

# Technologies Used
• React.js
• Redux
• Heroku
• Sequelize
• Express
• PostgreSQL


# To-do's / future features
• To round out this app I would add the feature to create, read, update, and delete bookings to the property the user specifies.
• Also include the ability to update reviews



# Technical Details
FairBnb Users View properties that they own and around the community by navigating thru the home or spot page. 

The Home page required grabbing data of each property from the back end to display. 

Creating a spot with an image required some extra work because our original form for creating an image did not include images, it was a feature that would be later added. To deal with this, I nested fetches, one fetch for the creation of the spot and the other for detials of the image. I also had to await dispatches because, I needed to wait for the information from the first dispatch in order to provide information to the second dispatch. 

```
export const addSpots = (addSpot) => async (dispatch) => {
    const { address, city, state, lat, lng, country, name, description, price, previewImage } = addSpot;
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            address,
            city,
            state,
            lat,
            lng,
            country,
            name,
            description,
            price

        })
    })
    if (response.ok) {
        const newSpot = await response.json();
        const newImg = await csrfFetch(`/api/spots/${newSpot.id}/images`, {
            method: 'POST',
            header: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: previewImage,
                previewImage: true
            })
        })
        if (newImg.ok) {
            newSpot.previewImage = previewImage
            dispatch(createSpot(newSpot))
            return newSpot
        }


    }

}


```
