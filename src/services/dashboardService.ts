import { DashboardRepository } from '../repositories/dashboardRepository';
import { AuthRepository } from '../repositories/authRepository'; 

export class DashboardService {
  private repo: DashboardRepository;
  private authRepo: AuthRepository;

  constructor() {
    this.repo = new DashboardRepository();
    this.authRepo = new AuthRepository();
  }

  async getLiveView(superviseurId: number) {
    return await this.repo.getLiveSessions(superviseurId);
  }

  async getHistory(superviseurId: number) {
    return await this.repo.getHistory(superviseurId);
  }

  async forceClose(sessionId: number) {
    const session = await this.repo.getActiveSessionById(sessionId);
    if (!session) return;

    await this.repo.closeIssue(sessionId);
    const totalPause = await this.repo.getSessionPause(sessionId);
    
    const endTime = new Date();
    if (session.startTime === null) {
      throw new Error('Debut de session time est null');
    }
    const durationSec = Math.floor((endTime.getTime() - session.startTime.getTime()) / 1000);
    
    await this.repo.updateSession(sessionId, endTime, Math.max(0, durationSec - totalPause));
  }

  async getProfile(superviseurId: number) {
    return await this.authRepo.findSuperviseurById(superviseurId);
  }
}