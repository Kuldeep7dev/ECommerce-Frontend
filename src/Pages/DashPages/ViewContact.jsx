import React, { useEffect, useState } from 'react';
import axiosInstance from '../../Config/AxiosInstance';
import { useNavigate, useParams, Link } from 'react-router-dom';
import BreadCrumb from '../../Component/BreadCrumb';
import { Trash, Mail, User, MessageSquare, Tag, Calendar, ChevronLeft, ShieldCheck } from 'lucide-react';
import ConfirmationModal from '../../Component/ConfirmationModel';
import { motion } from 'framer-motion';

const ViewContact = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [isConfirmationModelOpen, setIsConfirmationModelOpen] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    const fetchContact = async () => {
        try {
            setLoading(true);
            const res = await axiosInstance.get(`/notification/${id}`);
            const notificationData = res.data.notifications;
            setData(notificationData);
            if (notificationData?.name) {
                document.title = `Bravmia Admin || ${notificationData.name}`;
            }
        } catch (error) {
            console.error("Error fetching notification:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteNotification = async (notifId) => {
        try {
            await axiosInstance.delete(`/notification/${notifId}`);
            navigate('/contact');
        } catch (error) {
            console.error("Error deleting notification:", error);
        }
    };

    const handleDeleteAction = () => {
        setIsConfirmationModelOpen(true);
    };

    useEffect(() => {
        fetchContact();
        document.title = `Bravmia || Admin ${data.name}`
    }, [id]);

    const breadCrumbItem = [
        { title: 'Contact', link: '/contact' },
        { title: data.name || 'Notification' }
    ];

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-accent"></div>
            </div>
        );
    }

    return (
        <div className='py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto'>
            {/* Header / Breadcrumb */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 flex flex-wrap items-center justify-between gap-4"
            >
                <div className="space-y-1">
                    <BreadCrumb items={breadCrumbItem} />
                    <h1 className="text-3xl font-bold text-secondary">View Notification</h1>
                </div>

                <Link
                    to="/contact"
                    className="flex items-center gap-2 text-gray-500 hover:text-secondary transition-all font-medium bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 group"
                >
                    <ChevronLeft className="group-hover:-translate-x-1 transition-transform" size={18} />
                    Back to Inbox
                </Link>
            </motion.div>

            {/* Main Content Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-[2rem] shadow-[0_22px_70px_rgba(0,0,0,0.05)] overflow-hidden border border-gray-100"
            >
                {/* Branding Strip */}
                <div className="h-2 bg-accent w-full" />

                <div className="flex flex-col lg:flex-row">
                    {/* Left Sidebar: Sender Info */}
                    <div className="lg:w-1/3 bg-primary/20 p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-gray-100">
                        <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="h-24 w-24 rounded-3xl bg-secondary flex items-center justify-center text-4xl font-bold text-primary shadow-xl"
                            >
                                {data.name?.charAt(0).toUpperCase() || <User size={40} />}
                            </motion.div>

                            <div>
                                <h2 className="text-2xl font-bold text-secondary break-words">{data.name || "Anonymous User"}</h2>
                                <p className="text-gray-400 font-medium flex items-center justify-center lg:justify-start gap-1 text-sm mt-1">
                                    <Tag size={14} className="text-accent" />
                                    {data.entityModel || "System Notification"}
                                </p>
                            </div>

                            <div className="w-full space-y-4 pt-6 border-t border-gray-200/50">
                                <div className="space-y-1">
                                    <p className="text-[10px] tracking-widest uppercase text-gray-400 font-bold">Received At</p>
                                    <div className="flex items-center gap-2 text-secondary font-medium">
                                        <Calendar size={16} className="text-accent" />
                                        {data.createdAt ? new Date(data.createdAt).toLocaleString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        }) : "Unknown Date"}
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-[10px] tracking-widest uppercase text-gray-400 font-bold">Email</p>
                                    <div className="flex items-center gap-2 text-secondary font-medium">
                                        <Mail size={16} className="text-accent" />
                                        <span className="truncate">{data.email || "Not Provided"}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8 w-full">
                                <button
                                    onClick={handleDeleteAction}
                                    className="w-full py-4 rounded-2xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 font-bold flex items-center justify-center gap-2 border border-red-100 cursor-pointer shadow-sm mb-4"
                                >
                                    <Trash size={18} />
                                    Delete Record
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Message Content */}
                    <div className="lg:w-2/3 p-8 lg:p-12 space-y-10">
                        <section>
                            <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-wider mb-4">Subject</span>
                            <h3 className="text-2xl md:text-3xl font-semibold text-secondary leading-tight">
                                {data.title || "No subject specified"}
                            </h3>
                        </section>

                        <section className="bg-primary/10 rounded-[2rem] p-6 md:p-8 min-h-[300px] border border-gray-50">
                            <div className="flex items-center gap-2 mb-6">
                                <MessageSquare size={20} className="text-accent" />
                                <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Message Content</span>
                            </div>
                            <div className="text-gray-600 text-lg leading-relaxed whitespace-pre-wrap">
                                {data.message || "The notification contains no additional content."}
                            </div>
                        </section>

                        <footer className="pt-6 border-t border-gray-100 flex flex-wrap gap-4 text-xs text-gray-400 font-medium">
                            <span className="flex items-center gap-1.5">
                                <ShieldCheck size={14} className="text-accent" />
                                Verified Notification
                            </span>
                            <span className="ml-auto font-mono opacity-60">ID: {data._id}</span>
                        </footer>
                    </div>
                </div>
            </motion.div>

            <ConfirmationModal
                isOpen={isConfirmationModelOpen}
                type='danger'
                title='Confirm Deletion'
                message={`Are you sure you want to permanently delete the notification from "${data?.name}"? This action cannot be undone and will remove the record from the database.`}
                onClose={() => setIsConfirmationModelOpen(false)}
                actionButton={
                    <button
                        className='bg-red-500 text-white px-8 py-3 rounded-2xl hover:bg-red-600 transition-all cursor-pointer font-bold shadow-lg shadow-red-200 flex items-center gap-2'
                        onClick={async () => {
                            await handleDeleteNotification(data._id);
                            setIsConfirmationModelOpen(false);
                        }}
                    >
                        <Trash size={18} />
                        Delete Permanently
                    </button>
                }
            />
        </div>
    );
};

export default ViewContact;