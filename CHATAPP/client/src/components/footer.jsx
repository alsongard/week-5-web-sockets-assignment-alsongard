export default function Footer()
{
    return (
        <footer className="bg-gray-900 text-gray-300 px-6 pt-16 pb-8">
            <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10">
            {/* Get in Touch */}
                <div>
                    <h4 className="text-xl font-semibold mb-4 text-white">Get in Touch</h4>
                    <p className="text-sm mb-2">Have questions or feedback?</p>
                    <form className="flex flex-col gap-3">
                    <input
                        type="email"
                        placeholder="Your email"
                        className="p-2 rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-400"
                    />
                    <textarea
                        rows="3"
                        placeholder="Your message"
                        className="p-2 rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-400"
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                    >
                        Send
                    </button>
                    </form>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-xl font-semibold mb-4 text-white">Quick Links</h4>
                    <ul className="space-y-2 text-sm">
                    <li><a href="#" className="hover:text-white">Home</a></li>
                    <li><a href="#" className="hover:text-white">Features</a></li>
                    <li><a href="#" className="hover:text-white">Pricing</a></li>
                    <li><a href="#" className="hover:text-white">FAQ</a></li>
                    </ul>
                </div>

                {/* Legal */}
                <div>
                    <h4 className="text-xl font-semibold mb-4 text-white">Legal</h4>
                    <ul className="space-y-2 text-sm">
                    <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                    <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                    <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
                    </ul>
                </div>

                {/* Follow Us */}
                <div>
                    <h4 className="text-xl font-semibold mb-4 text-white">Follow Us</h4>
                    <ul className="space-y-2 text-sm">
                    <li><a href="#" className="hover:text-white">Twitter</a></li>
                    <li><a href="#" className="hover:text-white">Facebook</a></li>
                    <li><a href="#" className="hover:text-white">Instagram</a></li>
                    <li><a href="#" className="hover:text-white">LinkedIn</a></li>
                    </ul>
                </div>
            </div>

            <div className="mt-10 text-center text-sm text-gray-500">
                &copy; {new Date().getFullYear()} MessageChat. Built with ❤️ by Alson Tech.
            </div>
      </footer>

    )
}