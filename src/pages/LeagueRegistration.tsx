import { useEffect, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  createLeague,
  deleteLeague,
  getLeague,
  getLeagues,
  updateLeague,
} from '../services/leagueService';
import type { League } from '../services/leagueService';
import styles from './AuthPages.module.css';

const emptyForm = {
  name: '',
  description: '',
  game: '',
  region: '',
  startDate: '',
  endDate: '',
};

function LeagueRegistration() {
  const [formData, setFormData] = useState(emptyForm);
  const [leagues, setLeagues] = useState<League[]>([]);
  const [selectedLeague, setSelectedLeague] = useState<League | null>(null);
  const [editingLeagueId, setEditingLeagueId] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loadLeagues = async () => {
    try {
      setIsLoading(true);
      const leagueList = await getLeagues();
      setLeagues(leagueList);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load leagues.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadLeagues();
  }, []);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      return 'League name is required.';
    }

    if (!formData.game.trim()) {
      return 'Game is required.';
    }

    if (!formData.region.trim()) {
      return 'Region is required.';
    }

    if (!formData.startDate || !formData.endDate) {
      return 'Start date and end date are required.';
    }

    if (formData.endDate < formData.startDate) {
      return 'End date must be after the start date.';
    }

    return '';
  };

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingLeagueId(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSuccessMessage('');

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setIsSubmitting(true);

      const payload = {
        name: formData.name.trim(),
        description: formData.description.trim() || undefined,
        game: formData.game.trim(),
        region: formData.region.trim(),
        startDate: formData.startDate,
        endDate: formData.endDate,
      };

      if (editingLeagueId) {
        const updatedLeague = await updateLeague(editingLeagueId, payload);
        setSelectedLeague(updatedLeague);
        setSuccessMessage(`League updated successfully: ${updatedLeague.name}`);
      } else {
        const createdLeague = await createLeague(payload);
        setSelectedLeague(createdLeague);
        setSuccessMessage(`League created successfully: ${createdLeague.name}`);
      }

      resetForm();
      await loadLeagues();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save league.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleViewDetails = async (id: number) => {
    try {
      setError('');
      setSuccessMessage('');
      const league = await getLeague(id);
      setSelectedLeague(league);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load league details.');
    }
  };

  const handleEdit = (league: League) => {
    setEditingLeagueId(league.id);
    setFormData({
      name: league.name,
      description: league.description ?? '',
      game: league.game,
      region: league.region,
      startDate: league.startDate,
      endDate: league.endDate,
    });
    setSuccessMessage('');
    setError('');
  };

  const handleDelete = async (id: number) => {
    try {
      setError('');
      setSuccessMessage('');
      await deleteLeague(id);

      if (selectedLeague?.id === id) {
        setSelectedLeague(null);
      }

      if (editingLeagueId === id) {
        resetForm();
      }

      setSuccessMessage('League deleted successfully.');
      await loadLeagues();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete league.');
    }
  };

  return (
    <section className={styles.page}>
      <div className={`${styles.card} ${styles.leagueCard}`}>
        <span className={styles.badge}>
          <span className={styles.badgeDot} aria-hidden="true" />
          League setup
        </span>

        <h1 className={styles.title}>
          Launch your <span className={styles.gradientText}>league.</span>
        </h1>

        <p className={styles.subtitle}>
          Create, view, update, and manage league information through the Spring Boot backend.
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="league-name">
              League name
            </label>
            <input
              id="league-name"
              name="name"
              className={styles.input}
              type="text"
              placeholder="Acme Esports League"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="league-description">
              Description
            </label>
            <textarea
              id="league-description"
              name="description"
              className={styles.input}
              placeholder="Describe the league"
              value={formData.description}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="league-game">
              Game
            </label>
            <input
              id="league-game"
              name="game"
              className={styles.input}
              type="text"
              placeholder="Valorant"
              value={formData.game}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="league-region">
              Region
            </label>
            <input
              id="league-region"
              name="region"
              className={styles.input}
              type="text"
              placeholder="North America"
              value={formData.region}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="league-start-date">
              Start date
            </label>
            <input
              id="league-start-date"
              name="startDate"
              className={styles.input}
              type="date"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="league-end-date">
              End date
            </label>
            <input
              id="league-end-date"
              name="endDate"
              className={styles.input}
              type="date"
              value={formData.endDate}
              onChange={handleChange}
              required
            />
          </div>

          {error && (
            <div className={styles.previewNote} role="alert">
              {error}
            </div>
          )}

          {successMessage && (
            <div className={styles.previewNote}>
              {successMessage}
            </div>
          )}

          <button
            className={styles.primaryButton}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? 'Saving...'
              : editingLeagueId
                ? 'Update league'
                : 'Create my league'}
          </button>

          {editingLeagueId && (
            <button
              className={styles.primaryButton}
              type="button"
              onClick={resetForm}
            >
              Cancel edit
            </button>
          )}
        </form>

        <div className={styles.previewNote}>
          This page is connected to /api/leagues for league creation, listing, details, editing, and deletion.
        </div>

        <div style={{ marginTop: '1.5rem' }}>
          <h2>League list</h2>

          {isLoading ? (
            <p>Loading leagues...</p>
          ) : leagues.length === 0 ? (
            <p>No leagues found yet.</p>
          ) : (
            <div style={{ display: 'grid', gap: '1rem' }}>
              {leagues.map((league) => (
                <div
                  key={league.id}
                  className={styles.previewNote}
                  style={{ display: 'grid', gap: '0.75rem' }}
                >
                  <div>
                    <strong>{league.name}</strong>
                    <p>
                      {league.game} • {league.region} • {league.status}
                    </p>
                    <p>
                      {league.startDate} to {league.endDate}
                    </p>
                    <p>Tournaments: {league.tournamentCount}</p>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <button
                      className={styles.primaryButton}
                      type="button"
                      onClick={() => void handleViewDetails(league.id)}
                    >
                      View details
                    </button>

                    <button
                      className={styles.primaryButton}
                      type="button"
                      onClick={() => handleEdit(league)}
                    >
                      Edit
                    </button>

                    <button
                      className={styles.primaryButton}
                      type="button"
                      onClick={() => void handleDelete(league.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {selectedLeague && (
          <div className={styles.previewNote} style={{ marginTop: '1.5rem' }}>
            <h2>Selected league details</h2>
            <p><strong>Name:</strong> {selectedLeague.name}</p>
            <p><strong>Description:</strong> {selectedLeague.description || 'No description'}</p>
            <p><strong>Game:</strong> {selectedLeague.game}</p>
            <p><strong>Region:</strong> {selectedLeague.region}</p>
            <p><strong>Dates:</strong> {selectedLeague.startDate} to {selectedLeague.endDate}</p>
            <p><strong>Status:</strong> {selectedLeague.status}</p>
            <p><strong>Tournament count:</strong> {selectedLeague.tournamentCount}</p>
          </div>
        )}

        <p className={styles.footerText}>
          Already have an account?
          <Link className={styles.textLink} to="/login">
            Sign In
          </Link>
        </p>
      </div>
    </section>
  );
}

export default LeagueRegistration;