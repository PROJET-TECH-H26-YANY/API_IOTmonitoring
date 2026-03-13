import { db } from '../db';
import { sessions, students, issues } from '../db/schema';
import { eq, and, desc, sql, isNull } from 'drizzle-orm';

export class DashboardRepository {

  async getLiveSessions(superviseurId: number) {
    return await db.select({
      sessionId: sessions.id,
      studentName: students.name,
      startTime: sessions.startTime,
      macAddress: sessions.macAddress,
      status: sessions.status
    })
    .from(sessions)
    .innerJoin(students, eq(sessions.studentId, students.id))
    .where(and(
      eq(sessions.status, 'Active'),
      eq(students.superviseurId, superviseurId)
    ));
  }

  async getHistory(superviseurId: number) {
    return await db.select({
      sessionId: sessions.id,
      studentName: students.name,
      startTime: sessions.startTime,
      endTime: sessions.endTime,
      timeWorked: sessions.timeWorked,
      status: sessions.status
    })
    .from(sessions)
    .innerJoin(students, eq(sessions.studentId, students.id))
    .where(eq(students.superviseurId, superviseurId))
    .orderBy(desc(sessions.startTime))
    .limit(50);
  }

  async getActiveSessionById(sessionId: number) {
    return await db.query.sessions.findFirst({
      where: and(
        eq(sessions.id, sessionId),
        eq(sessions.status, 'Active')
      )
    });
  }

  async closeIssue(sessionId: number) {
    await db.update(issues)
      .set({
        endAbsence: new Date(),
        durationSecond: sql`TIMESTAMPDIFF(SECOND, ${issues.startAbsence}, NOW())`
      })
      .where(and(
        eq(issues.sessionId, sessionId),
        isNull(issues.endAbsence) 
      ));
  }

  async getSessionPause(sessionId: number) {
    const pauseResult = await db.select({
      totalPause: sql<string>`COALESCE(SUM(${issues.durationSecond}), 0)`
    })
    .from(issues)
    .where(eq(issues.sessionId, sessionId));

    return parseInt(pauseResult[0].totalPause || '0', 10);
  }

  async updateSession(sessionId: number, endTime: Date, timeWorked: number) {
    await db.update(sessions)
      .set({
        endTime: endTime,
        status: 'Terminée',
        timeWorked: timeWorked
      })
      .where(eq(sessions.id, sessionId));
  }
}