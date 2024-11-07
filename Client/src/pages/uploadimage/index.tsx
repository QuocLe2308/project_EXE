"use client";

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function UploadImage() {
    const [file, setFile] = useState<File | null>(null);
    const searchParams = useSearchParams();
    const propertyId = searchParams?.get('propertyId');
    const router = useRouter();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const token = Cookies.get('token');

        if (!token) {
            alert('Bạn cần đăng nhập để tải lên hình ảnh.');
            return;
        }

        if (!file) {
            alert('Please select an image file.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        if (propertyId) {
            formData.append('propertyId', propertyId);
        } else {
            alert('Property ID is not available.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/image', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                alert('Image uploaded successfully!');
                setFile(null);
            } else {
                console.error('Failed to upload image');
                const errorMessage = await response.text();
                console.error('Error message:', errorMessage);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleBackToList = () => {
        router.push('/list');
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
                    Upload Image for Property {propertyId}
                </h1>
                {propertyId ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex flex-col items-center justify-center w-full">
                            <label className="w-full flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-50 transition duration-300">
                                <svg className="w-8 h-8 text-blue-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                                </svg>
                                <span className="mt-2 text-base leading-normal">Select an image</span>
                                <input
                                    type="file"
                                    className="hidden"
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    required
                                />
                            </label>
                            {file && (
                                <p className="mt-2 text-sm text-gray-600">
                                    Selected file: {file.name}
                                </p>
                            )}
                        </div>
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300"
                            >
                                Upload Image
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="text-center text-red-600">
                        Property ID không có sẵn. Vui lòng trở lại và thử lại.
                    </div>
                )}
                <div className="mt-6 text-center">
                    <button
                        onClick={handleBackToList}
                        className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-300"
                    >
                        Quay lại danh sách
                    </button>
                </div>
            </div>
        </div>
    );
}
