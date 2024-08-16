import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className='bg-gray-800 text-white py-8'>
            <div className='container mx-auto px-4'>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-8 mb-8'>
                    <div>
                        <h3 className='font-bold text-lg mb-4'>Get to Know Us</h3>
                        <ul>
                            <li><a href='/about' className='hover:text-gray-400'>About Us</a></li>
                            <li><a href='/careers' className='hover:text-gray-400'>Careers</a></li>
                            <li><a href='/press' className='hover:text-gray-400'>Press Releases</a></li>
                            <li><a href='/blog' className='hover:text-gray-400'>Blog</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className='font-bold text-lg mb-4'>Connect with Us</h3>
                        <ul>
                            <li><a href='/facebook' className='hover:text-gray-400 flex items-center'><FaFacebook className='mr-2'/> Facebook</a></li>
                            <li><a href='/twitter' className='hover:text-gray-400 flex items-center'><FaTwitter className='mr-2'/> Twitter</a></li>
                            <li><a href='/instagram' className='hover:text-gray-400 flex items-center'><FaInstagram className='mr-2'/> Instagram</a></li>
                            <li><a href='/linkedin' className='hover:text-gray-400 flex items-center'><FaLinkedin className='mr-2'/> LinkedIn</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className='font-bold text-lg mb-4'>Make Money with Us</h3>
                        <ul>
                            <li><a href='/sell' className='hover:text-gray-400'>Sell on Our Site</a></li>
                            <li><a href='/affiliate' className='hover:text-gray-400'>Affiliate Program</a></li>
                            <li><a href='/advertising' className='hover:text-gray-400'>Advertising</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className='font-bold text-lg mb-4'>Let Us Help You</h3>
                        <ul>
                            <li><a href='/contact' className='hover:text-gray-400'>Contact Us</a></li>
                            <li><a href='/returns' className='hover:text-gray-400'>Returns & Replacements</a></li>
                            <li><a href='/help' className='hover:text-gray-400'>Help</a></li>
                        </ul>
                    </div>
                </div>
                <div className='text-center text-gray-400'>
                    <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
