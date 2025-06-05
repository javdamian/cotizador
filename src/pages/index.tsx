import React from 'react';

const Home: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold">Welcome to Cotizador</h1>
            <p className="mt-4 text-lg">Your one-stop solution for all your quoting needs.</p>
        </div>
    );
};

export default Home;