import React, { useState, useEffect } from 'react';
import { getAuth, updateProfile, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import Navbar from './Navbar';

const UserProfileUpdate = () => {
    const auth = getAuth();
    const [formData, setFormData] = useState({
        displayName: '',
        email: '',
        zipCode: '',
        state: '',
        phoneNumber: '',
        // Add other form fields here
    });
    const [user, setUser] = useState(null);
    const [errors, setErrors] = useState({});
    const [submittedData, setSubmittedData] = useState(null);

    useEffect(() => {
        // Observe the authentication state changes to get the current user
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
            if (authUser) {
                // Populate form data with the current user's information
                setFormData({
                    displayName: authUser.displayName || '',
                    email: authUser.email || '',
                    zipCode: '',
                    state: '',
                    phoneNumber: '',
                    // Set other form fields accordingly
                });
                setUser(authUser);

                // Fetch additional user data from Firestore if it exists
                const firestore = getFirestore();
                const userDocRef = doc(firestore, 'users', authUser.displayName);

                // Check if the document exists before fetching data
                // This prevents errors when the document doesn't exist
                if (userDocRef) {
                    // Fetch the user data
                    getDoc(userDocRef)
                        .then((docSnapshot) => {
                            if (docSnapshot.exists()) {
                                const userData = docSnapshot.data();
                                if (userData) {
                                    setFormData((prevData) => ({
                                        ...prevData,
                                        zipCode: userData.zipCode || '',
                                        state: userData.state || '',
                                        phoneNumber: userData.phoneNumber || '',
                                    }));
                                }
                            }
                        })
                        .catch((error) => {
                            console.error('Error fetching user data:', error);
                        });
                }
            } else {
                setUser(null);
            }
        });

        // Clean up the observer when the component unmounts
        return () => unsubscribe();
    }, [auth]);

    // Validation functions
    const validateZipCode = (zipCode) => {
        const regex = /^[0-9]{5}$/;
        return regex.test(zipCode) ? '' : 'Invalid Zip Code';
    };

    const validateState = (state) => {
        const regex = /^[A-Za-z]{2}$/;
        return regex.test(state) ? '' : 'Invalid State';
    };

    const validatePhoneNumber = (phoneNumber) => {
        const regex = /^[0-9]{10}$/;
        return regex.test(phoneNumber) ? '' : 'Invalid Phone Number';
    };

    const validateForm = () => {
        const errors = {};
        errors.zipCode = validateZipCode(formData.zipCode);
        errors.state = validateState(formData.state);
        errors.phoneNumber = validatePhoneNumber(formData.phoneNumber);

        setErrors(errors);

        return Object.values(errors).every((error) => error === '');
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        // Validate the form
        if (!validateForm()) {
            return;
        }

        try {
            if (user) {
                // Check if the user changed their display name
                if (user.displayName !== formData.displayName) {
                    // Delete the old Firestore document
                    const firestore = getFirestore();
                    const oldUserDocRef = doc(firestore, 'users', user.displayName);

                    if (oldUserDocRef) {
                        await deleteDoc(oldUserDocRef);
                    }
                }

                // Update user profile with the form data
                await updateProfile(user, {
                    displayName: formData.displayName,
                    // Update other user information here if needed
                    // For example, email: formData.email,
                });

                // Save additional user data to Firestore
                const firestore = getFirestore();
                const userDocRef = doc(firestore, 'users', formData.displayName);

                const userData = {
                    zipCode: formData.zipCode,
                    state: formData.state,
                    phoneNumber: formData.phoneNumber,
                };

                await setDoc(userDocRef, userData);

                // Log the updated information
                console.log('Profile updated successfully:', user);

                // Clear the form fields
                setFormData((prevData) => ({
                    ...prevData,
                    displayName: '',
                    email: '',
                    zipCode: '',
                    state: '',
                    phoneNumber: '',
                    // Clear other form fields here
                }));

                // Handle successful update or redirect to a confirmation page
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            // Handle update error, display an error message, etc.
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-semibold mb-4">Update Your Profile</h2>
                <form onSubmit={handleUpdateProfile} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Display Name */}
                    <div>
                        <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">
                            Display Name
                        </label>
                        <input
                            type="text"
                            id="displayName"
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            value={formData.displayName}
                            onChange={(e) =>
                                setFormData({ ...formData, displayName: e.target.value })
                            }
                        />
                        {/* Display error message if needed */}
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                            }
                        />
                        {/* Display error message if needed */}
                    </div>

                    {/* Zip Code */}
                    <div>
                        <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                            Zip Code
                        </label>
                        <input
                            type="text"
                            id="zipCode"
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            value={formData.zipCode}
                            onChange={(e) =>
                                setFormData({ ...formData, zipCode: e.target.value })
                            }
                        />
                        {/* Display error message if needed */}
                        {errors.zipCode && (
                            <span className="text-red-600 text-xs">{errors.zipCode}</span>
                        )}
                    </div>

                    {/* State */}
                    <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                            State
                        </label>
                        <input
                            type="text"
                            id="state"
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            value={formData.state}
                            onChange={(e) =>
                                setFormData({ ...formData, state: e.target.value })
                            }
                        />
                        {/* Display error message if needed */}
                        {errors.state && (
                            <span className="text-red-600 text-xs">{errors.state}</span>
                        )}
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                            Phone Number
                        </label>
                        <input
                            type="text"
                            id="phoneNumber"
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            value={formData.phoneNumber}
                            onChange={(e) =>
                                setFormData({ ...formData, phoneNumber: e.target.value })
                            }
                        />
                        {/* Display error message if needed */}
                        {errors.phoneNumber && (
                            <span className="text-red-600 text-xs">{errors.phoneNumber}</span>
                        )}
                    </div>

                    {/* ... (Other form fields with similar structure) */}

                    {/* Terms and Conditions (Checkbox) */}
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Terms and Conditions <span className="text-red-600">*</span>
                        </label>
                        <label className="inline-flex items-center mt-1">
                            <input
                                type="checkbox"
                                id="acceptedTerms"
                                checked={formData.acceptedTerms}
                                onChange={(e) =>
                                    setFormData({ ...formData, acceptedTerms: e.target.checked })
                                }
                            />
                            <span className="ml-2">I accept the terms and conditions.</span>
                        </label>
                        {errors.acceptedTerms && (
                            <span className="text-red-600 text-xs">{errors.acceptedTerms}</span>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="col-span-2">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                        >
                            Update Profile
                        </button>
                    </div>
                </form>

                {/* Display submitted data on confirmation */}
                {submittedData && (
                    <div className="mt-4">
                        <h3 className="text-xl font-semibold">Confirmation</h3>
                        <pre>{JSON.stringify(submittedData, null, 2)}</pre>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProfileUpdate;
