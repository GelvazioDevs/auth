import { supabase } from './supabase.js';

export const api = {
  // Systems
  async getSystems() {
    const { data, error } = await supabase
      .from('systems')
      .select('*');
    
    if (error) throw error;
    return data;
  },

  async createSystem(system) {
    const { data, error } = await supabase
      .from('systems')
      .insert([system])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteSystem(id) {
    const { error } = await supabase
      .from('systems')
      .delete()
      .eq('siscodigo', id);
    
    if (error) throw error;
  },

  // Users
  async getUsers() {
    const { data, error } = await supabase
      .from('users')
      .select('*');
    
    if (error) throw error;
    return data;
  },

  async createUser(user) {
    const { data, error } = await supabase
      .from('users')
      .insert([user])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteUser(id) {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('usucodigo', id);
    
    if (error) throw error;
  },

  async login(username, password) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('usulogin', username)
      .eq('ususenha', password)
      .eq('usuativo', true)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Permissions
  async getPermissions() {
    const { data, error } = await supabase
      .from('permissions')
      .select('*');
    
    if (error) throw error;
    return data;
  },

  async createPermission(permission) {
    const { data, error } = await supabase
      .from('permissions')
      .insert([permission])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deletePermission(id) {
    const { error } = await supabase
      .from('permissions')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};