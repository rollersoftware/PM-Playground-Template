import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { PrototypeDirectory } from './components/PrototypeDirectory';
import { getPrototypeBySlug } from './prototypeRegistry';

function PrototypeRenderer() {
  const { slug } = useParams<{ slug: string }>();
  const prototype = slug ? getPrototypeBySlug(slug) : undefined;
  if (!prototype) return <Navigate to="/" replace />;
  return <>{prototype.element}</>;
}

export default function App() {
  return (
    // Hellow world
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrototypeDirectory />} />
        <Route path="/p/:slug" element={<PrototypeRenderer />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
