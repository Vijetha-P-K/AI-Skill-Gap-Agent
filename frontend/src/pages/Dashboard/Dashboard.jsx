import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Gauge,
  TrendingUp,
  FileText,
  MessagesSquare,
  Compass,
  Sparkles,
  Map,
  CheckCircle2,
} from 'lucide-react';
import MainLayout from '../../layouts/MainLayout.jsx';
import SkillCard from '../../components/dashboard/SkillCard.jsx';
import ProgressChart from '../../components/dashboard/ProgressChart.jsx';
import ReadinessCard from '../../components/dashboard/ReadinessCard.jsx';
import RecommendationCard from '../../components/dashboard/RecommendationCard.jsx';
import Card from '../../components/common/Card.jsx';
import Loader from '../../components/common/Loader.jsx';
import useAuth from '../../hooks/useAuth';
import { getDashboardStats } from '../../services/skillService';
import { formatDate } from '../../utils/helpers';
import './Dashboard.css';

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats()
      .then((res) => setStats(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <MainLayout><Loader text="Loading your dashboard…" /></MainLayout>;

  const s = stats || {};

  return (
    <MainLayout>
      <div className="dash-header">
        <div>
          <h1>Hello, {user?.full_name?.split(' ')[0]} 👋</h1>
          <p>Here is a snapshot of your learning journey.</p>
        </div>
        <Link to="/assessment" className="btn btn-primary">New Skill Analysis</Link>
      </div>

      <div className="grid-4" style={{ marginBottom: 24 }}>
        <SkillCard icon={Gauge} title="Current Skill Level" value={s.current_skill_level || 'Not analyzed'} sub={s.confidence_score != null ? `Confidence ${Math.round(s.confidence_score)}%` : 'Run an analysis'} />
        <SkillCard icon={TrendingUp} title="Learning Progress" value={`${s.completed_topics_count || 0} topics`} sub={`${s.total_analyses || 0} analyses done`} />
        <SkillCard icon={FileText} title="Resume Score" value={s.resume_score != null ? `${Math.round(s.resume_score)}/100` : 'No resume'} sub={`${s.total_resume_reports || 0} resume reports`} />
        <SkillCard icon={MessagesSquare} title="Interview Readiness" value={s.total_interview_preps ? `${s.total_interview_preps} preps` : 'Not started'} sub="AI interview practice" />
      </div>

      <div className="grid-2" style={{ marginBottom: 24 }}>
        <Card>
          <h3 style={{ marginBottom: 16 }}>Progress Overview</h3>
          <ProgressChart label="Confidence Score" value={s.confidence_score || 0} />
          <ProgressChart label="Resume Score" value={s.resume_score || 0} />
          <ProgressChart
            label="Career Readiness"
            value={Math.min(100, (s.total_analyses || 0) * 15 + (s.total_roadmaps || 0) * 15 + (s.total_resume_reports || 0) * 20 + (s.total_interview_preps || 0) * 10)}
          />
        </Card>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <ReadinessCard title="Interview Readiness" text={s.interview_readiness} />
          <ReadinessCard title="Career Readiness" text={s.career_readiness} />
        </div>
      </div>

      <div className="grid-2" style={{ marginBottom: 24 }}>
        <RecommendationCard title="Recommended Skills" items={s.recommended_skills || []} />
        <Card>
          <h3 style={{ fontSize: 16, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Map size={18} /> Active Roadmap
          </h3>
          {s.active_roadmap ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="badge"><Sparkles size={14} /> {s.active_roadmap.technology}</span>
              <Link to="/roadmap" className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: 13 }}>View</Link>
            </div>
          ) : (
            <p style={{ fontSize: 14, color: 'var(--text-soft)' }}>
              No roadmap yet. <Link to="/roadmap" style={{ color: 'var(--blue-dark)', fontWeight: 600 }}>Generate one</Link>.
            </p>
          )}
        </Card>
      </div>

      <div className="grid-2">
        <Card>
          <h3 style={{ fontSize: 16, marginBottom: 12 }}>Recent Analyses</h3>
          {(s.recent_analyses || []).length ? (
            s.recent_analyses.map((a) => (
              <div key={a.id} className="dash-row">
                <div>
                  <p style={{ fontWeight: 600 }}>{a.technology}</p>
                  <p style={{ fontSize: 13, color: 'var(--text-soft)' }}>{formatDate(a.created_at)}</p>
                </div>
                <span className="badge">{a.current_level || 'Analyzed'}</span>
              </div>
            ))
          ) : (
            <p style={{ fontSize: 14, color: 'var(--text-soft)' }}>No analyses yet.</p>
          )}
        </Card>
        <Card>
          <h3 style={{ fontSize: 16, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
            <CheckCircle2 size={18} /> Completed Topics
          </h3>
          {(s.completed_topics || []).length ? (
            <div style={{ maxHeight: 180, overflow: 'auto' }}>
              {s.completed_topics.map((t) => <span key={t} className="chip">{t}</span>)}
            </div>
          ) : (
            <p style={{ fontSize: 14, color: 'var(--text-soft)' }}>Complete a skill analysis to track topics.</p>
          )}
        </Card>
      </div>
    </MainLayout>
  );
}
