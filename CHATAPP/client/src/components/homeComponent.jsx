export default function HomePage()
{
    return (
        <div className='w-full'>
            <section className="min-h-screen flex flex-col justify-center items-center px-6 text-center bg-gradient-to-br from-blue-100 to-purple-200">
                <h1 className="text-5xl md:text-6xl font-bold text-blue-700 mb-4">
                Welcome to MessageChat
                </h1>
                <p className="text-lg md:text-xl text-gray-700 max-w-2xl mb-6">
                Connect with friends, family, or your team instantly. MessageChat lets you chat in real-time with a clean and simple interface.
                </p>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-2xl text-lg hover:bg-blue-700 transition-all shadow-md">
                Start Chatting
                </button>
            </section>

            {/* Features Section */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-gray-800 mb-12">Why Use MessageChat?</h2>
                    <div className="grid md:grid-cols-3 gap-10">
                        <div className="p-6 border rounded-2xl shadow hover:shadow-lg transition">
                            <h3 className="text-xl font-semibold mb-2">Real-Time Messaging</h3>
                            <p className="text-gray-600">Send and receive messages instantly with lightning-fast updates powered by WebSockets.</p>
                        </div>
                        <div className="p-6 border rounded-2xl shadow hover:shadow-lg transition">
                            <h3 className="text-xl font-semibold mb-2">Secure Conversations</h3>
                            <p className="text-gray-600">Your privacy matters. Chats are encrypted and never stored without your permission.</p>
                        </div>
                        <div className="p-6 border rounded-2xl shadow hover:shadow-lg transition">
                            <h3 className="text-xl font-semibold mb-2">Accessible Anywhere</h3>
                            <p className="text-gray-600">Use MessageChat from your phone, tablet, or computer — anywhere you are.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-6 bg-blue-600 text-white text-center">
                <h2 className="text-4xl font-bold mb-4">Ready to start chatting?</h2>
                <p className="text-lg mb-6">Join the growing community of users who trust MessageChat for smooth and secure communication.</p>
                <button className="bg-white text-blue-600 px-6 py-3 rounded-2xl text-lg hover:bg-gray-100 transition-all">
                    Get Started
                </button>
            </section>
        </div>
    )
}