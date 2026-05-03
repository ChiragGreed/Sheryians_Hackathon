import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { uploadContextFile, uploadContextText } from '../services/knowledge.api';

const UploadContextModal = ({ isOpen, onClose }) => {
  const [uploadType, setUploadType] = useState('text'); // 'text' or 'file'
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Get the logged in user from Redux to grab their organizationId
  const user = useSelector((state) => state.auth.user);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // Provide a fallback organizationId if not found (or throw error)
    const orgId = user?.organizationId || 'default-org-id';

    try {
      if (uploadType === 'text') {
        if (!text.trim()) {
          setError('Please enter some text context.');
          setLoading(false);
          return;
        }
        await uploadContextText(text, orgId);
      } else {
        if (!file) {
          setError('Please select a PDF file.');
          setLoading(false);
          return;
        }
        await uploadContextFile(file, orgId);
      }
      
      setSuccess('Context uploaded successfully!');
      setText('');
      setFile(null);
      
      // Close modal after success
      setTimeout(() => {
        onClose();
        setSuccess('');
      }, 1500);

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Failed to upload context');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-surface-container-lowest w-full max-w-md rounded-2xl border border-outline/10 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-outline/10 flex items-center justify-between">
          <h2 className="font-headline-md text-lg text-on-surface">Upload AI Context</h2>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-surface-container text-on-surface-variant transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          <p className="text-sm text-on-surface-variant mb-6">
            Provide additional knowledge (company policies, Q&A, manuals) to improve the AI's responses.
          </p>

          {/* Type Selector */}
          <div className="flex p-1 bg-surface-container rounded-lg mb-6">
            <button 
              onClick={() => setUploadType('text')}
              className={`flex-1 py-1.5 text-sm font-label-bold rounded-md transition-colors ${uploadType === 'text' ? 'bg-surface-container-lowest text-on-surface shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
            >
              Raw Text
            </button>
            <button 
              onClick={() => setUploadType('file')}
              className={`flex-1 py-1.5 text-sm font-label-bold rounded-md transition-colors ${uploadType === 'file' ? 'bg-surface-container-lowest text-on-surface shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
            >
              PDF File
            </button>
          </div>

          {error && <div className="mb-4 px-3 py-2 bg-error/10 border border-error/20 text-error text-xs rounded-lg">{error}</div>}
          {success && <div className="mb-4 px-3 py-2 bg-green-500/10 border border-green-500/20 text-green-500 text-xs rounded-lg">{success}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            {uploadType === 'text' ? (
              <div>
                <label className="block text-xs font-label-bold text-on-surface-variant mb-1.5">Context Text</label>
                <textarea 
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="E.g., Our refund policy states that items can be returned within 30 days..."
                  className="w-full h-32 px-3 py-2 bg-surface bg-background border border-outline/20 rounded-lg text-sm text-on-surface focus:outline-none focus:border-primary-fixed focus:ring-1 focus:ring-primary-fixed resize-none"
                />
              </div>
            ) : (
              <div>
                <label className="block text-xs font-label-bold text-on-surface-variant mb-1.5">Upload PDF Document</label>
                <div className="border-2 border-dashed border-outline/20 rounded-lg p-6 flex flex-col items-center justify-center bg-background/50 hover:bg-surface-container/30 transition-colors">
                  <span className="material-symbols-outlined text-4xl text-primary-fixed mb-2">picture_as_pdf</span>
                  <p className="text-sm text-on-surface-variant text-center mb-4">
                    {file ? file.name : "Select a PDF file to upload"}
                  </p>
                  <label className="cursor-pointer bg-surface-container text-on-surface px-4 py-2 rounded-lg text-xs font-label-bold hover:brightness-110 transition-all">
                    Choose File
                    <input 
                      type="file" 
                      accept=".pdf" 
                      className="hidden" 
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </label>
                </div>
              </div>
            )}

            <div className="pt-4 flex gap-3">
              <button 
                type="button" 
                onClick={onClose}
                className="flex-1 px-4 py-2 rounded-lg border border-outline/20 text-on-surface text-sm font-label-bold hover:bg-surface-container transition-all"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={loading}
                className="flex-1 px-4 py-2 rounded-lg bg-primary-fixed text-on-primary text-sm font-label-bold hover:brightness-110 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-on-primary border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px]">upload</span>
                    Upload
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadContextModal;
