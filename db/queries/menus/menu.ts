import { db } from '@/db';
import { AddMenu, menus } from '@/db/schema';
import { desc, eq, isNull } from 'drizzle-orm';

export const getMenus = () => {
  return db
    .select()
    .from(menus)
    .where(isNull(menus.deletedAt))
    .orderBy(desc(menus.createdAt));
};

export const getMenuById = async (id: string) => {
  return db.select().from(menus).where(eq(menus.id, id));
};

export const addMenu = async (menuData: AddMenu) => {
  try {
    const [result] = await db.insert(menus).values(menuData).returning();

    return { success: true, data: result };
  } catch (error) {
    console.error('Unable to add menu', error);
    return { success: false, error };
  }
};

export const editMenu = async (id: string, menuData: AddMenu) => {
  try {
    const [result] = await db
      .update(menus)
      .set({
        ...menuData,
        updatedAt: new Date(),
      })
      .where(eq(menus.id, id))
      .returning();

    return { success: true, data: result };
  } catch (error) {
    console.error('Unable to update menu', error);
    return { success: false, error };
  }
};

export const deleteMenu = async (id: string) => {
  try {
    const [result] = await db
      .update(menus)
      .set({ deletedAt: new Date() })
      .where(eq(menus.id, id))
      .returning();

    return { success: true, data: result };
  } catch (error) {
    console.error('Unable to delete menu', error);
    return { success: false, error };
  }
};
